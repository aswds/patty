import React from "react";
// import forgotPassword from "../../components/forgotPassword";
import { Alert } from "react-native";
import ChangeEmail from "../VerifyEmail/ChangeEmail";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { set_errorMsg_errorType } from "./Sign_up/Sign_up_screens/Sign_up_Functions/signUp";
import { error_handle } from "./Sign_up/Sign_up_screens/Sign_up_Functions/error_handle";

const Recovery = ({ navigation }) => {
  async function passRecovery(userEmail, setError) {
    const auth = getAuth();
    sendPasswordResetEmail(auth, userEmail)
      .then(async () => {
        setError({
          message: "We've sent you a letter to reset password",
          showErrorModal: true,
          onPress: () => {
            navigation.goBack();
          },
        });
      })
      .catch((e) => {
        set_errorMsg_errorType(e.code).catch((e) => {
          setError({
            message: e.message,
            showErrorModal: true,
          });
        });
      });
  }

  return (
    <>
      <ChangeEmail
        passRecoveryFunction={passRecovery}
        isPasswordReset={true}
        navigation={navigation}
      />
    </>
  );
};

export default Recovery;
