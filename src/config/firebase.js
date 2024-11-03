// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIjWn5k1GVViZizgH5Rr7AHwrCZGB4VJw",
  authDomain: "vite-contact-d0191.firebaseapp.com",
  projectId: "vite-contact-d0191",
  storageBucket: "vite-contact-d0191.appspot.com",
  messagingSenderId: "1079882065415",
  appId: "1:1079882065415:web:7a8a400bc5ed67f09b6ca2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db  = getFirestore(app);