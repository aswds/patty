import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as Haptics from "expo-haptics";
import { authentication } from "../../../../../../firebase";
import { AuthReducer, initialState } from "../../../../../redux/AuthReducer";
import { useReducer } from "react";
import error_handle from "./error_handle";

export const user_signIn = async (
  setEmail,
  setPassword,
  setErrorMsg,
  setShowModal,
  email,
  password,
  signIn
) => {
  const auth = getAuth();
  return new Promise((res, rej) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        res();
      })
      .catch((error) => {
        error_handle({
          error: error.code,
          setEmail,
          setPassword,
          setErrorMsg,
          setShowModal,
        });
        rej();
      });
  });
};
