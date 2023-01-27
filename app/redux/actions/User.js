import { doc, getDoc } from "firebase/firestore";
import { Alert } from "react-native";
import { auth, db } from "../../../firebase";
import {
  USER_STATE_CHANGE,
  USER_STATE_LOADED,
} from "../constants/user_constants";

export function fetch_user() {
  return async (dispatch) => {
    dispatch({ type: USER_STATE_CHANGE });
    try {
      const docRef = doc(db, `USERS/${auth.currentUser.uid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return dispatch({
          type: USER_STATE_LOADED,
          isLoading: false,
          current_user: docSnap.data(),
        });
      }
    } catch (err) {
      Alert.alert(
        "User not found",
        "We can't find user with that credentials."
      );
      await auth.signOut();
    }
  };
}

export function fetch_followers(uid) {
  return async (dispatch) => {};
}
