// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Added for future image uploads

const firebaseConfig = {
  // REPLACE WITH YOUR REAL FIREBASE CONFIG KEYS
  apiKey: "AIzaSyCEBf4W6wZgmBO5KdjerkNiIXva_kAFmr8",
  authDomain: "photography-80e8c.firebaseapp.com",
  projectId: "photography-80e8c",
  storageBucket: "photography-80e8c.firebasestorage.app",
  messagingSenderId: "817681772182",
  appId: "1:817681772182:web:4b2738b6f9f20f77fc9cb7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const appId = 'lumos-lens-v1'; // Unique ID for your artifact logic