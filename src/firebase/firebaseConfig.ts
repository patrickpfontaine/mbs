// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
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
  measurementId: "G-HNM1NKH78J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);