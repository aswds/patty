import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../../../firebase";
import error_handle from "./error_handle";

export async function user_signIn(
  setEmail,
  setPassword,
  setErrorMsg,
  setShowModal,
  setShowLoader,
  email,
  password,
  signIn
) {
  setShowLoader(true);
  await signInWithEmailAndPassword(auth, email, password).catch(
    async (error) => {
      await error_handle({
        error: error.code,
        setEmail,
        setPassword,
        setErrorMsg,
        setShowModal,
      });
    }
  );
  setShowLoader(false);
}
