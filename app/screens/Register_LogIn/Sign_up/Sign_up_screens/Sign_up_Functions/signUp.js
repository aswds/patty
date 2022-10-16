const firebaseAuth = require("firebase/auth");

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { uploadImage } from "./uploadImage";
import { db, auth } from "../../../../../../firebase";
export const signUpHandle = (email, password, username, name, image) => {
  signUp(email, password, username, name, image);
};
const signUp = (email, password, username, name, image) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (result) => {
      console.log();
      await setDoc(doc(db, `USERS`, `${auth.currentUser.uid}`), {
        email: email,
        verifiedEmail: false,
        username: username,
        searchUsername: username.toLowerCase(),
        name: name || "",
        country: "",
        city: "",
        phoneNumber: "",
        userImage: "",
        createdAt: Timestamp.fromDate(new Date()) || new Date(),
        userUID: auth.currentUser.uid,
      }).then(() => {
        uploadImage(image);
      });
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      error.message.replace('[Error], "" ');
      return error.message;
    });
};
export default signUp;
