import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as Haptics from "expo-haptics";
import { authentication } from "../../../../firebase";
export const user_signIn = (
  setEmail,
  setPassword,
  setErrorMsg,
  setShowModal,
  email,
  password
) => {
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
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
