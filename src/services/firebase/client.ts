import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmnl0aIuHus21C0cPbcXbrsjQcK7N_K24",
  authDomain: "dilio-36346.firebaseapp.com",
  projectId: "dilio-36346",
  storageBucket: "dilio-36346.appspot.com",
  messagingSenderId: "518008319090",
  appId: "1:518008319090:web:3670a85f50e15f848ce6eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
