import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import {getAuth} from "firebase/auth"

// const firebaseConfig = {
//   apiKey: "AIzaSyCNqfAK9_uKd_GeE7YAdiV9v4YsQdvYcYY",
//   authDomain: "hackthe6ix2023.firebaseapp.com",
//   projectId: "hackthe6ix2023",
//   storageBucket: "hackthe6ix2023.appspot.com",
//   messagingSenderId: "835586435889",
//   appId: "1:835586435889:web:40b5e406005d624267de10",
//   measurementId: "G-Y5SKF7YCWX"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDo_gmrWKND2AYlVwPmbtUZPgjgEarhErw",
  authDomain: "test-e1ea2.firebaseapp.com",
  projectId: "test-e1ea2",
  storageBucket: "test-e1ea2.appspot.com",
  messagingSenderId: "916003214021",
  appId: "1:916003214021:web:2c2364fb424e68112d16ac",
  measurementId: "G-HXMV5VMP4X"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const db = getFirestore(app);

export default app
