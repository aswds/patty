import React from "react";
import * as Haptics from "expo-haptics";
export default function error_handle(props) {
  const { error, setErrorMsg, setPassword, setShowModal, setEmail } = props;
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  console.log(error);
  switch (error) {
    case "auth/invalid-email":
      setErrorMsg(
        "The format of your email address is not correct please enter your correct email address to proceed."
      ),
        setEmail(false);
      setShowModal(true);
      break;
    case "auth/wrong-password":
      setErrorMsg(
        "Sorry, you entered the wrong password. Check your password again."
      ),
        setPassword({
          isValid: false,
        }),
        setShowModal(true);
      break;
    case "auth/user-not-found":
      setErrorMsg(
        "The email you entered does not belong to the account. Check your email and try again."
      ),
        setEmail(false);
      setShowModal(true);
      break;
    case "auth/internal-error":
      setErrorMsg("Something went wrong...");
      setPassword(false);
      setShowModal(true);
      break;
    default:
      break;
  }
}
