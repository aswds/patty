// import React and necessary components from react-native
import React, { useState } from "react";
import { Alert, Dimensions, StyleSheet, Text, View } from "react-native";
// import vector icons from expo
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
// import custom components
import BigButton from "../Authorization/components/BigButton";
import Input from "../../shared/Input/Input";
import { BackButton } from "../../shared/Buttons/BackButton";
import CustomAlert from "../../shared/Alert/CustomAlert";
import { Screen } from "../../shared/Screen/Screen";
// import colors from colors file
import { colors } from "../../src/colors";
// import firebase functions
import { auth } from "../../../firebase";
// import error handling functions
import { error_handle } from "../Authorization/Sign_up/Sign_up_screens/Sign_up_Functions/error_handle";
import { set_errorMsg_errorType } from "../Authorization/Sign_up/Sign_up_screens/Sign_up_Functions/signUp";
// import font family
import { FontFamily } from "../../../assets/fonts/Fonts";
// import safe area insets
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { VerificationStackScreenProp } from "../../Types/Authorization/Verification/NavigationTypes";
import { updateEmail } from "firebase/auth";
// ResetText component to render text based on isPasswordReset boolean value
function ResetText({ isPasswordReset }: { isPasswordReset?: boolean }) {
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

// AfterReset component to render text after resetting the email
function AfterReset() {
  return (
    <View style={styles.textTerms}>
      <Text style={styles.textTermsStyle}>
        After changing your email, you will be directed to login with a new
        credential
      </Text>
    </View>
  );
}

interface ChangeEmailProps extends VerificationStackScreenProp<"ChangeEmail"> {
  passRecoveryFunction?: (userEmail: string) => {};
  isPasswordReset?: boolean;
}
// ChangeEmail component to change user's email
export default function ChangeEmail({
  navigation,
  route,
  isPasswordReset,
  passRecoveryFunction,
}: ChangeEmailProps) {
  // declare state variables
  const [userEmail, setUserEmail] = useState<string>("");
  const [valid, setValid] = useState({
    validEmail: true,
    validPassword: true,
  });
  const [error, setError] = useState({
    message: "",
    showErrorModal: false,
  });
  // get safe area insets
  const insets = useSafeAreaInsets();

  // changeEmail function to update user's email
  function changeEmail(email: string) {
    updateEmail(auth.currentUser!, email)
      .then(() => {
        Alert.alert("You'll have to login with changed email");
        navigation.navigate("VerifyEmail", { changedEmail: email });
      })
      .catch((e) => {
        if (e.code === "auth/requires-recent-login") {
          Alert.alert("You'll have to login with changed email.", "", [
            { text: "Ok", onPress: async () => await auth.signOut() },
          ]);
        }
        // error handling
        set_errorMsg_errorType(e.code).catch((e) => {
          error_handle("email", e.message, { valid, setValid }).catch((e) => {
            setError({ message: e, showErrorModal: true });
          });
        });
      });
  }

  // _hideModal function to hide error modal
  function _hideModal() {
    setError({ ...error, showErrorModal: false });
  }

  // render ChangeEmail component
  return (
    <>
      <Screen>
        <BackButton navigation={navigation} style={{}} />

        <View style={styles.container}>
          <ResetText isPasswordReset={isPasswordReset} />
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
            style={{ ...styles.inputField, alignSelf: "center" }}
            placeholderTextColor={"grey"}
            placeholder="Email"
            onChangeText={(text) => {
              setUserEmail(text), setValid({ ...valid, validEmail: true });
            }}
            // defaultValue={user.email}
          />
          {/* kemibrtoik@gmail.com */}
          <View>
            <BigButton
              style={{
                ...styles.shadowButton,
              }}
              onPress={() => {
                if (userEmail) {
                  isPasswordReset && passRecoveryFunction
                    ? passRecoveryFunction(userEmail)
                    : changeEmail(userEmail);
                }
              }}
              textStyle={styles.textStyle}
              title={"Submit"}
            />
          </View>
        </View>

        <AfterReset />
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
    fontFamily: FontFamily.bold,
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
    width: "100%",
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

  textTerms: {
    height: "10%",
    marginTop: "10%",
    alignSelf: "center",
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  textTermsStyle: {
    fontFamily: "Lato-Regular",
    fontSize: 13,
    fontWeight: "400",
    color: "grey",
    textAlign: "center",
  },
});
