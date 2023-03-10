import { doc, getDoc } from "firebase/firestore";
import { Alert } from "react-native";
import { auth, db } from "../../../firebase";
import { userLoading, userReceived } from "../reducers/User";

export function fetch_user() {
  return async (dispatch) => {
    dispatch(userLoading());
    try {
      const docRef = doc(db, `USERS/${auth.currentUser.uid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return dispatch(userReceived(docSnap.data()));
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
