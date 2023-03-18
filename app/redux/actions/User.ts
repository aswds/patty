import { doc, getDoc } from "firebase/firestore";
import { Alert } from "react-native";
import { auth, db } from "../../../firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../Types/User";

export const fetch_user = createAsyncThunk(
  "user/fetch_user",
  async (): Promise<IUser | Error> => {
    try {
      const docRef = doc(db, `USERS/${auth.currentUser?.uid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as IUser;
      } else {
        Alert.alert(
          "User not found",
          "We can't find user with that credentials."
        );
        await auth.signOut();
        return new Error();
      }
    } catch (err) {
      Alert.alert("We can't load user with that credentials.");
      await auth.signOut();
      return new Error();
    }
  }
);
