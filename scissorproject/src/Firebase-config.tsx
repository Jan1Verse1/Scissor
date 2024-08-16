// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  where,
  getDocs,
  Timestamp,
  updateDoc,
  increment,
  arrayUnion,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4-ECIGBOu626wCv183dBgCpOueKAIZCc",
  authDomain: "scissor-c364b.firebaseapp.com",
  projectId: "scissor-c364b",
  storageBucket: "scissor-c364b.appspot.com",
  messagingSenderId: "139953913467",
  appId: "1:139953913467:web:2c6fccc650c6787c7d2cde",
  measurementId: "G-48SR5N28JY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

export {
  app,
  analytics,
  auth,
  db,
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  where,
  getDocs,
  Timestamp,
  updateDoc,
  increment,
  arrayUnion,
};
