import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBLvCJLRfOMIh-nppS9JEeqbUVyRpoSvy8",
  authDomain: "ht6-2023.firebaseapp.com",
  projectId: "ht6-2023",
  storageBucket: "ht6-2023.appspot.com",
  messagingSenderId: "564977803819",
  appId: "1:564977803819:web:caedee535f61bd8c84006e",
  measurementId: "G-QDR02EN8FE"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
