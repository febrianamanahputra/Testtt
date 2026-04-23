import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlQXcrCvdLTozSRvPQU-MmL4MBWYM75d8",
  authDomain: "renovki-3d604.firebaseapp.com",
  projectId: "renovki-3d604",
  storageBucket: "renovki-3d604.firebasestorage.app",
  messagingSenderId: "400329908850",
  appId: "1:400329908850:web:d1d6fd18a131d1712bd8eb",
  measurementId: "G-06VHP5RMDK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();