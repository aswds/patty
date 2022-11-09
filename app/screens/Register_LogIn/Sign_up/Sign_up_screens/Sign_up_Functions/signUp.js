const firebaseAuth = require("firebase/auth");

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { uploadImage } from "./uploadImage";
import { db, auth } from "../../../../../../firebase";
import { Alert } from "react-native";
import * as Haptics from "expo-haptics";
function set_errorMsg_errorType(error_code) {
  return new Promise((res, rej) => {
    switch (error_code) {
      case "auth/invalid-email":
        rej({
          error_type: "email",
          message: "The provided email is invalid",
        });
        break;
      case "auth/invalid-password":
        rej({
          error_type: "password",
          message:
            "The provided value for the password is invalid. It must be at least six characters.",
        });
        break;
      case "auth/email-already-exists":
        rej({
          error_type: "email",
          message:
            "The provided email is already in use by an existing user. Each user must have a unique email.",
        });
        break;
      case "auth/email-already-in-use":
        rej({
          error_type: "email",
          message:
            "The provided email is already in use by an existing user. Each user must have a unique email.",
        });
      case "auth/weak-password":
        rej({
          error_type: "password",
          message: "Password should be at least 6 characters.",
        });
        break;

      default:
        rej({ error_type: "unknown", message: "Something went wrong..." });
        break;
    }
  });
}
async function setDocs(result, userInfo) {
  const { email, username, name, image } = userInfo;
  await setDoc(doc(db, `USERS`, `${auth.currentUser.uid}`), {
    userUID: auth.currentUser.uid,
    email: email,
    verifiedEmail: false,
    username: username,
    searchUsername: username.toLowerCase(),
    name: name || "",
    country: "",
    city: "",
    phoneNumber: "",
    userImage: "",
    following: 0,
    followers: 0,
    createdAt: Timestamp.fromDate(new Date()).toJSON() || new Date(),
  }).then(() => {
    uploadImage(image, auth.currentUser);
  });
}

export const signUpHandle = async (
  email,
  password,
  username,
  name,
  image,
  setError
) => {
  const userInfo = {
    email,
    username,
    name,
    image,
  };
  return new Promise((res, rej) => {
    const { user } = createUserWithEmailAndPassword(auth, email, password)
      .then((res) => setDocs(res, userInfo))

      .catch((error) => {
        set_errorMsg_errorType(error.code)
          .then((res) => {
            res(res);
          })
          .catch((e) => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            rej(e);
          });
      });
  });
};
