/* eslint-disable @typescript-eslint/no-unused-vars */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  apiKey: "AIzaSyACtDnGujEf4yUrvOVnL3xDBj-6OkYWYv0",
  authDomain: "beautybestie-2875e.firebaseapp.com",
  projectId: "beautybestie-2875e",
  storageBucket: "beautybestie-2875e.appspot.com",
  messagingSenderId: "396877867601",
  appId: "1:396877867601:web:d98011711f5ef2e8fd2670",
  measurementId: "G-6EMYM4K3M0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore();
