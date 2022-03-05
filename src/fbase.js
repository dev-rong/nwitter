// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
//import { initializeApp } from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import  { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage"
//import { getAnalytics } from "firebase/compat/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId:  process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket:  process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_FIREBASE_MESSAGINGSENDERID,
  appId:  process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const authService = getAuth();
export const dbService = getFirestore();
export const storageService = getStorage();
// const analytics = getAnalytics(app);
