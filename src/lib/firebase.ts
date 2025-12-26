import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// IMPORTANT: Replace with your web app's Firebase configuration.
// It's recommended to use environment variables for this.
const firebaseConfig = {
  apiKey: "AIzaSyCkdkkSWL6Z_88slI5qE0dCvGFZ4BuwxDs",
  authDomain: "website-auth-c5924.firebaseapp.com",
  projectId: "website-auth-c5924",
  storageBucket: "website-auth-c5924.firebasestorage.app",
  messagingSenderId: "992877384618",
  appId: "1:992877384618:web:ec6d54c4cb7739d8dcd1d3"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
