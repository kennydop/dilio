"use client";

import "@/app/globals.css";
import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  collection,
  addDoc,
} from "firebase/firestore";

import {
  useContext,
  useState,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { GoogleProvider, auth, db } from "@/services/firebase/config";
import { Loading } from "@/app/shared/components/MaterialTailwind/MaterialTailwind";
import { ICartItem, IOrder, IUserContext, IUserDoc } from "./types";

const UserContext = createContext<IUserContext | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userDoc, setUserDoc] = useState<IUserDoc | null>(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user && !userDoc) await getUserDoc(user);
      else {
        setUserDoc(null);
        // check if user is on '/cart' or '/orders' and redirect to '/'
        if (
          window.location.href.includes("/cart") ||
          window.location.href.includes("/orders")
        ) {
          window.location.href = "/";
        }
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
      setLoading(false);
    };
  }, []);

  const getUserDoc = async (user: User) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserDoc(docSnap.data() as IUserDoc);
    } else {
      // doc.data() will be undefined in this case
    }
  };

  const createNewAccount = async (
    name: string,
    email: string,
    password: string
  ) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const _user = userCredential.user;
        // Store user information in Firestore
        await updateProfile(_user, {
          displayName: name,
          photoURL: `https://placeholder-avatars.herokuapp.com/?name=${email}&type=pattern&color=0052ff&bg=cadcff`,
        });
        await setDoc(doc(db, "users", _user.uid), {
          displayName: name,
          email: _user.email,
          photoURL: `https://placeholder-avatars.herokuapp.com/?name=${email}&type=pattern&color=0052ff&bg=cadcff`,
          cart: [],
          orders: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      })
      .catch((error) => {
        // console.log(error);
        // console.log(error.code);
        throw error;
      });
  };

  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, GoogleProvider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // Store user information in Firestore
        await setDoc(doc(db, "users", user.uid), {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          cart: [],
          orders: [],
          token: token,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      })
      .catch((error) => {
        // console.log(error.code);
        throw error;
      });
  };

  const signInWithEmail = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Successful login
      })
      .catch((error) => {
        // Handle error

        // console.log(error.code);
        throw error;
      });
  };

  const updateCart = async (cart: ICartItem[]) => {
    if (user) {
      await updateDoc(doc(db, "users", user.uid), {
        cart: cart,
      });
      setUserDoc((prev) => {
        return {
          ...prev!,
          cart: cart,
        };
      });
    }
  };

  const placeOrder = async (order: IOrder) => {
    const ordersRef = collection(db, "orders");
    await addDoc(ordersRef, order);

    await updateDoc(doc(db, "users", user!.uid), {
      orders: [...userDoc!.orders!, order.code],
    });

    setUserDoc((prev) => {
      return {
        ...prev!,
        orders: [...prev!.orders!, order.code],
      };
    });
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const value: IUserContext = {
    user,
    userDoc,
    createNewAccount,
    signInWithGoogle,
    signInWithEmail,
    updateCart,
    placeOrder,
    logOut,
  };

  return loading ? (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loading className="h-8 w-8" />
    </div>
  ) : (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};
