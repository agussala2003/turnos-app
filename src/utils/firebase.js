// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-dkCF9OZFvEZ5ObIVjTAOYcMNcMvSfCQ",
  authDomain: "turnos-app-a31f0.firebaseapp.com",
  projectId: "turnos-app-a31f0",
  storageBucket: "turnos-app-a31f0.firebasestorage.app",
  messagingSenderId: "383768077295",
  appId: "1:383768077295:web:ef028bcb2d826d1bb00c1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);