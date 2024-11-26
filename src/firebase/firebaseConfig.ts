// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBItJx112PXn1gDxRtD0C8BCkN0bDU0b8",
  authDomain: "moviebooking-ca757.firebaseapp.com",
  projectId: "moviebooking-ca757",
  storageBucket: "moviebooking-ca757.firebasestorage.app",
  messagingSenderId: "729733207947",
  appId: "1:729733207947:web:91759a6a02a7f13924818e",
  measurementId: "G-HNM1NKH78J",
  databaseURL: "https://moviebooking-ca757-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

export const auth = getAuth(app);