import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA7vuKjrUJmX7wbGii2xUQcQFwJ2YolHOk",
  authDomain: "login2-df9a3.firebaseapp.com",
  projectId: "login2-df9a3",
  storageBucket: "login2-df9a3.appspot.com",
  messagingSenderId: "1080138806721",
  appId: "1:1080138806721:web:f1c9be004ba9f3dfe3eb40",
  measurementId: "G-GKG0ZC4X7P"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()