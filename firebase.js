import { getAuth, initializeAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getReactNativePersistence } from "firebase/auth/react-native";
// import { getMessaging } from "firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
// Your web app's Firebase configuration

export const firebaseConfig = Constants.manifest.extra.firebaseConfig;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
