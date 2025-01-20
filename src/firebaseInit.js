// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8PUTWj_QQ0CXADFG9azpAgBWm-yZW5aY",
  authDomain: "mapprofiles.firebaseapp.com",
  projectId: "mapprofiles",
  storageBucket: "mapprofiles.firebasestorage.app",
  messagingSenderId: "389971720938",
  appId: "1:389971720938:web:13906030e9676a99903593",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
