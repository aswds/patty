import React from "react";
// import forgotPassword from "../../components/forgotPassword";
import { Alert } from "react-native";
import ChangeEmail from "../VerifyEmail/ChangeEmail";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { set_errorMsg_errorType } from "./Sign_up/Sign_up_screens/Sign_up_Functions/signUp";
import { error_handle } from "./Sign_up/Sign_up_screens/Sign_up_Functions/error_handle";

const Recovery = ({ navigation }) => {
  function passRecovery(userEmail) {
    const auth = getAuth();
    sendPasswordResetEmail(auth, userEmail)
      .then(() => {
        Alert.alert("We've sent you a letter to reset password");
      })
      .catch((e) => {
        set_errorMsg_errorType(e.code).catch((e) => {
          error_handle("email", e.message, {}).catch((e) => {
            Alert.alert({ message: e, showErrorModal: true });
          });
        });
      });
  }

  return (
    <ChangeEmail
      passRecoveryFunction={passRecovery}
      isPasswordReset={true}
      navigation={navigation}
    />
  );
};

export default Recovery;
