import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as Haptics from "expo-haptics";
import { authentication } from "../../../../firebase";
import { AuthReducer, initialState } from "../../../redux/AuthReducer";
import { useReducer } from "react";
export const user_signIn = (
  setEmail,
  setPassword,
  setErrorMsg,
  setShowModal,
  email,
  password,
  dispatch
) => {
  const auth = getAuth();
  dispatch({ type: "AUTH_START" });

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      dispatch({ type: "AUTH_END" });
    })
    .catch((error) => {
      console.log("f");
      // dispatch({ type: "AUTH_END" });
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      if (error.code == "auth/invalid-email") {
        setErrorMsg(
          "The format of your email address is not correct please enter your correct email address to proceed."
        ),
          setEmail(false);
        setShowModal(true);
      } else if (error.code == "auth/wrong-password") {
        setPassword({
          isValid: false,
        }),
          setErrorMsg(
            "Sorry, you entered the wrong password. Check your password again."
          ),
          setShowModal(true);
      } else if (error.code == "auth/user-not-found") {
        setErrorMsg(
          "The email you entered does not belong to the account. Check your username and try again."
        ),
          setEmail(false);
        setShowModal(true);
      }
    });
};
