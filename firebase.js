// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyD8PXs45tVtd_dfEYD_iRwc6fJjQhDr-Po",
  authDomain: "patty-9be57.firebaseapp.com",
  projectId: "patty-9be57",
  storageBucket: "patty-9be57.appspot.com",
  messagingSenderId: "1018637611472",
  appId: "1:1018637611472:web:02d3b2910d373efa8609d5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
