import { collection, where, query, getDocs } from "firebase/firestore";

import { db } from "../../../../../../firebase";
export const sameUsernames = async (username, setUsernameError) => {
  return new Promise(async (resolve, reject) => {
    const q = query(
      collection(db, "USERS"),
      where("searchUsername", "==", username.toLowerCase())
    );
    const querySnapshot = await getDocs(q)
      .then((snapshot) => {
        if (snapshot.empty) {
          resolve(true);
        } else {
          setUsernameError("Username is already taken!");
          reject(false);
        }
      })
      .catch((e) => console.log(e));
  });
};
