import { getAuth, initializeAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Your web app's Firebase configuration
const {
  FIREBASE_API,
  FIREBASE_APPID,
  FIREBASE_AUTHDOMAIN,
  FIREBASE_MESSAGINGSENDERID,
  FIREBASE_PROJECTID,
  FIREBASE_STORAGEBUCKET,
} = process.env;
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
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
