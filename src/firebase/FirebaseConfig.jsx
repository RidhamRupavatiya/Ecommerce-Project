// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuHPO04q09tTWlQbxSX2o0hmRnRHJQiQQ",
  authDomain: "ecommerce-c9fb8.firebaseapp.com",
  projectId: "ecommerce-c9fb8",
  storageBucket: "ecommerce-c9fb8.appspot.com",
  messagingSenderId: "622935776247",
  appId: "1:622935776247:web:8b3609d84d11a93304ecf2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth};