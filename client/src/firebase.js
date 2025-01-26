// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,    
  authDomain: "real-state-142ab.firebaseapp.com",
  projectId: "real-state-142ab",
  storageBucket: "real-state-142ab.firebasestorage.app",
  messagingSenderId: "372865661037",
  appId: "1:372865661037:web:4fd98ea91bb307430d2764"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);