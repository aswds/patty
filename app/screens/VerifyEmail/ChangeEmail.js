import React, { useState } from "react";
// import forgotPassword from "../../components/forgotPassword";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Button from "../Register_LogIn/components/button";
import { colors } from "../../src/colors";
import Input from "../../shared/Input/Input";
import Screen from "./components/Screen";
import { BackButton } from "../Register_LogIn/components/BackButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { updateEmail } from "firebase/auth";
import { auth } from "../../../firebase";
import { error_handle } from "../Register_LogIn/Sign_up/Sign_up_screens/Sign_up_Functions/error_handle";
import CustomAlert from "../Register_LogIn/CustomAlert";
import { set_errorMsg_errorType } from "../Register_LogIn/Sign_up/Sign_up_screens/Sign_up_Functions/signUp";

function ResetText({ isPasswordReset }) {
  const passRecoveryText = "Reset your password";
  const emailResetText = "Reset your email";
  return (
    <View style={styles.titleContainer}>
      <MaterialCommunityIcons
        name="email-edit"
        size={128}
        color={colors.accentColor}
      />
      <Text
        style={{ fontSize: 20, alignSelf: "center", color: colors.iconColor }}
      >
        {isPasswordReset ? passRecoveryText : emailResetText}
      </Text>
    </View>
  );
}

export default function ChangeEmail({
  navigation,
  passRecoveryFunction,
  isPasswordReset,
}) {
  const [userEmail, setUserEmail] = useState("");
  const [valid, setValid] = useState({
    validEmail: true,
    validPassword: true,
  });
  const [error, setError] = useState({
    message: "",
    showErrorModal: false,
  });
  const insets = useSafeAreaInsets();
  function changeEmail(email) {
    updateEmail(auth.currentUser, email)
      .then((r) => {
        navigation.navigate("VerifyEmail", { changedEmail: email });
      })
      .catch((e) => {
        set_errorMsg_errorType(e.code).catch((e) => {
          error_handle("email", e.message, { valid, setValid }).catch((e) => {
            setError({ message: e, showErrorModal: true });
          });
        });
      });
  }
  function _hideModal() {
    setError({ ...error, showErrorModal: false });
  }
  return (
    <>
      <Screen>
        <BackButton navigation={navigation} style={{ marginTop: insets.top }} />
        <View style={styles.container}>
          <ResetText isPasswordReset={isPasswordReset} />
          <View style={styles.inputsContainer}>
            <Input
              isValid={valid.validEmail}
              icon={
                <MaterialIcons
                  name="alternate-email"
                  size={Dimensions.get("window").height >= 800 ? 24 : 20}
                  color={colors.iconColor}
                />
              }
              autoCapitalize="none"
              keyboardType="email-address"
              style={{ ...styles.inputField }}
              placeholderTextColor={"grey"}
              placeholder="Email"
              onChangeText={(text) => setUserEmail(text)}
              // defaultValue={user.email}
            />
            <Button
              style={{
                ...styles.shadowButton,
              }}
              onPress={() => {
                if (userEmail) {
                  isPasswordReset
                    ? passRecoveryFunction(userEmail)
                    : changeEmail(userEmail);
                }
              }}
              textStyle={styles.textStyle}
            >
              Submit
            </Button>
          </View>
        </View>
      </Screen>
      <CustomAlert
        errorMsg={error.message}
        hideModal={_hideModal}
        showModal={error.showErrorModal}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  titleContainer: { alignItems: "center" },
  textStyle: {
    color: colors.buttonTextColor,
    fontSize: 17,
    fontFamily: "WorkSans-Bold",
  },
  buttonStyle: {},
  shadowButton: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    borderRadius: 13,
    backgroundColor: colors.accentColor,
    height: 60,
    alignSelf: "center",
    marginTop: 30,
    width: "80%",
  },
  inputField: {
    width: "80%",
    height: 60,
    justifyContent: "center",
    borderRadius: 20,
  },
  inputsContainer: {
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
