import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Alert } from "react-native";
import { auth, db } from "../../../firebase";
import {
  USER_INFO_LOADED,
  USER_INFO_LOADING,
  USER_STATE_CHANGE,
} from "../constants/user_constants";
export function fetch_user(userUID, setUser) {
  return async (dispatch) => {
    const docRef = doc(db, `USERS/${auth.currentUser.uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());

      return dispatch({
        type: USER_STATE_CHANGE,
        current_user: docSnap.data(),
      });
    } else {
      Alert.alert(
        "User not found",
        "We can't find user with that credentials."
      );
      console.log("No such document!");
    }
  };
}
