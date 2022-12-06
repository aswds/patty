import { collection, where, query, getDocs } from "firebase/firestore";
import { Alert } from "react-native";

import { db } from "../../../../../../firebase";
export const sameUsernames = async (username, setErrorMsg) => {
  return new Promise(async (resolve, reject) => {
    if (username.length < 3) {
      setErrorMsg("Username should contain more than 3 letters");
      reject(false);
    } else {
      const q = query(
        collection(db, "USERS"),
        where("searchUsername", "==", username.toLowerCase())
      );
      const querySnapshot = await getDocs(q)
        .then((snapshot) => {
          if (snapshot.empty) {
            resolve(true);
          } else {
            setErrorMsg("Username is already taken ");
            reject(false);
          }
        })
        .catch((e) => Alert.alert(e));
    }
  });
};
