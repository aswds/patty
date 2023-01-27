import React, { useState } from "react";
// import forgotPassword from "../../components/forgotPassword";
import { Alert, Dimensions, StyleSheet } from "react-native";
import ChangeEmail from "../VerifyEmail/ChangeEmail";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { set_errorMsg_errorType } from "./Sign_up/Sign_up_screens/Sign_up_Functions/signUp";
import { error_handle } from "./Sign_up/Sign_up_screens/Sign_up_Functions/error_handle";

const Recovery = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  shadowButton: {
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      height: 7,
      width: 0,
    },
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 13,
    backgroundColor: "rgba(155 , 50, 50 , 1)",
    height: Dimensions.get("window").height / 14,
    alignSelf: "center",
  },
  inputField: {
    width: Dimensions.get("window").width / 2.1,
    height: Dimensions.get("window").height / 13,
    justifyContent: "center",
    borderRadius: 20,
  },
  rContainer: {
    height: "30%",
    width: "100%",
    alignItems: "center",
  },
  userInput: {
    flexDirection: "row",
    backgroundColor: "white",
    marginTop: "30%",
    width: Dimensions.get("window").width / 1.5,
    height: Dimensions.get("window").height / 13,
    justifyContent: "flex-start",
    paddingLeft: 10,
    borderRadius: 15,
    alignItems: "center",
  },
});

export default Recovery;
