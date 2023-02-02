import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../../../firebase";
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
