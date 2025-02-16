// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Add Firestore
import { getDatabase } from "firebase/database"; // Add Realtime Database
import { getAuth } from "firebase/auth"; // Add Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCC7knmb6AG_ueb3TMqShEsNz7Qde3EQ68",
  authDomain: "seuwslatest.firebaseapp.com",
  databaseURL: "https://seuwslatest-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "seuwslatest",
  storageBucket: "seuwslatest.firebasestorage.app",
  messagingSenderId: "389592350820",
  appId: "1:389592350820:web:a9eb9925b98cc920b31f71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore (for structured data)
const db = getFirestore(app);

// Initialize Realtime Database (for real-time updates)
const realtimeDb = getDatabase(app);

// Initialize Authentication
const auth = getAuth(app);

// Export the services you need
export { db, realtimeDb, auth };