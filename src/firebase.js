// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestore for structured data
import { getDatabase } from "firebase/database"; // Realtime Database
import { getAuth } from "firebase/auth"; // Authentication

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCC7knmb6AG_ueb3TMqShEsNz7Qde3EQ68",
  authDomain: "seuwslatest.firebaseapp.com",
  databaseURL: "https://seuwslatest-default-rtdb.asia-southeast1.firebasedatabase.app", // ✅ Ensure HTTPS is used
  projectId: "seuwslatest",
  storageBucket: "seuwslatest.appspot.com", // ✅ Fixed storageBucket typo
  messagingSenderId: "389592350820",
  appId: "1:389592350820:web:a9eb9925b98cc920b31f71"
};

// ✅ Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase Services
const firestoreDb = getFirestore(app); // Firestore
const realtimeDb = getDatabase(app); // Realtime Database
const auth = getAuth(app); // Authentication

// ✅ Export Firebase Instances
export { app, firestoreDb, realtimeDb, auth };
