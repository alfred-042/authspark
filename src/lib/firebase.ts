// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCkdkkSWL6Z_88slI5qE0dCvGFZ4BuwxDs",
    authDomain: "website-auth-c5924.firebaseapp.com",
    projectId: "website-auth-c5924",
    storageBucket: "website-auth-c5924.firebasestorage.app",
    messagingSenderId: "992877384618",
    appId: "1:992877384618:web:ec6d54c4cb7739d8dcd1d3"
  };
  

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
