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

interface IUserContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<any>>;
  createNewAccount: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser]: any = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDoc, setUserDoc] = useState<any>(null);

  console.log("BEFORE USE EFFECT");
  useEffect(() => {
    console.log("RUNNING USE EFFECT");
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("AUTH STATE CHANGED");
      console.log(user);
      setUser(user);
      // if (user) await getUserDoc(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
      console.log("UNSUBSCRIBED");
      setLoading(false);
    };
  }, []);

  const getUserDoc = async (user: User) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserDoc(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
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
        });
      })
      .catch((error) => {
        console.log(error);
        console.log(error.code);
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
          token: token,
        });
      })
      .catch((error) => {
        console.log(error.code);
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

        console.log(error.code);
        throw error;
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
    setUser,
    createNewAccount,
    signInWithGoogle,
    signInWithEmail,
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