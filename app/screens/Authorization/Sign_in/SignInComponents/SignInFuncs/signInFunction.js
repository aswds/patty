import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../../../firebase";
import error_handle from "./error_handle";

export function user_signIn(
  setEmail,
  setPassword,
  setErrorMsg,
  setShowModal,
  email,
  password,
  signIn
) {
  return new Promise((res, rej) => {
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
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
}
