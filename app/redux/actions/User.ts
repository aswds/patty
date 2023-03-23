import { doc, onSnapshot } from "firebase/firestore";
import { Alert } from "react-native";
import { auth, db } from "../../../firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../Types/User";

export const fetch_user = createAsyncThunk(
  "user/fetch_user",
  async (): Promise<IUser> => {
    return new Promise((resolve, reject) => {
      const docRef = doc(db, `USERS/${auth.currentUser?.uid}`);
      onSnapshot(docRef, async (docSnap) => {
        if (docSnap.exists()) {
          resolve(docSnap.data() as IUser);
          // eventEmitter.emit("user_change");
        } else {
          Alert.alert(
            "User not found",
            "We can't find user with that credentials."
          );
          await auth.signOut();
          reject(new Error());
        }
      });
    });
  }
);
