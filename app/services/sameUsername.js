import { collection, getDocs, query, where } from "firebase/firestore";
import { Alert } from "react-native";

import { db } from "../../firebase";
export const sameUsernames = async (username, handleError) => {
  return new Promise(async (resolve, reject) => {
    if (username.length < 3) {
      handleError(
        "Too short username",
        "Usernames need to be at least 4 characters long. Time to get creative!"
      );
      reject(false);
    } else if (username.length >= 20) {
      handleError(
        "Psst...short usernames preferred.",
        "Keep it under 20 characters. Thanks!"
      );
      reject(false);
    } else {
      const q = await query(
        collection(db, "USERS"),
        where("username", "==", `${username.toLowerCase()}`)
      );
      const querySnapshot = await getDocs(q).then((snapshot) => {
        if (snapshot.empty) {
          resolve(true);
        } else {
          handleError("", "Sorry, this username is taken.");
          reject(false);
        }
      });
    }
  });
};
