import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCNqfAK9_uKd_GeE7YAdiV9v4YsQdvYcYY",
  authDomain: "hackthe6ix2023.firebaseapp.com",
  projectId: "hackthe6ix2023",
  storageBucket: "hackthe6ix2023.appspot.com",
  messagingSenderId: "835586435889",
  appId: "1:835586435889:web:40b5e406005d624267de10",
  measurementId: "G-Y5SKF7YCWX"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
