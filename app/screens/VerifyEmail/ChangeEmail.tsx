// import React and necessary components from react-native
import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
// import vector icons from expo
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
// import custom components
import CustomAlert from "../../shared/Alert/CustomAlert";
import { BackButton } from "../../shared/Buttons/BackButton";
import BigButton from "../../shared/Buttons/BigButton";
import Input from "../../shared/Input/Input";
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
import {
  User,
  getAuth,
  reauthenticateWithCredential,
  signOut,
  updateEmail,
} from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth/react-native";
import { VerificationStackScreenProp } from "../../Types/Authorization/Verification/NavigationTypes";
import { ReauthModal } from "../../shared/Alert/ReauthModal";
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
function AfterReset({ isPasswordReset }: { isPasswordReset: boolean }) {
  return (
    <View style={styles.textTerms}>
      <Text style={styles.textTermsStyle}>
        {!isPasswordReset
          ? `Once you've successfully updated your email, you will be redirected to log in using your new login information.`
          : `Please provide your email address in order to reset your password.`}
      </Text>
    </View>
  );
}

interface ChangeEmailProps extends VerificationStackScreenProp<"ChangeEmail"> {
  passRecoveryFunction?: (userEmail: string) => void;
  isPasswordReset?: boolean;
  navigationBack?: any;
}
// ChangeEmail component to change user's email
export default function ChangeEmail({
  navigation,
  route,
  isPasswordReset,
  navigationBack,
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
    onPress: () => {},
  });
  const [showReauthModal, setShowReauthModal] = useState(false);
  const [reauthError, setReauthError] = useState<string>();
  // changeEmail function to update user's email
  async function changeEmail(pass: string) {
    try {
      handleReauth(pass);
    } catch (e) {
      // Perform error handling for set_errorMsg_errorType
      await set_errorMsg_errorType(e.code).catch((e) => {
        error_handle("email", e.message, { valid, setValid }).catch((e) => {
          setError({ message: e, showErrorModal: true });
        });
      });
    }
  }

  // _hideModal function to hide error modal
  function _hideModal() {
    setError({ ...error, showErrorModal: false });
  }

  async function handleReauth(pass: string) {
    const currentUser: User | null = getAuth().currentUser;

    if (currentUser) {
      const credential = EmailAuthProvider.credential(currentUser.email, pass);

      await reauthenticateWithCredential(currentUser, credential)
        .then(async () => {
          // Refresh the auth token after reauthentication
          await currentUser.getIdToken(true);

          // Proceed with email change
          await updateEmail(currentUser, userEmail).then(() => {
            setError({
              message:
                "We have sent you a letter, please re-login with new email",
              showErrorModal: true,
              onPress: async () => {
                await signOut(auth);
              },
            });
            setShowReauthModal(false);
          });
        })
        .catch((e) => {
          if (e.code === "auth/wrong-password") {
            setReauthError("Wrong password");
          } else {
            setReauthError("Something went wrong...");
          }
        });
    }
  }
  // render ChangeEmail component
  return (
    <>
      <Screen>
        <BackButton navigation={navigationBack ?? navigation} style={{}} />

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
        </View>
        <AfterReset isPasswordReset={isPasswordReset} />

        <View style={{ width: "100%" }}>
          <BigButton
            style={{
              ...styles.shadowButton,
              width: "100%",
            }}
            onPress={async () => {
              if (userEmail) {
                isPasswordReset && passRecoveryFunction
                  ? passRecoveryFunction(userEmail, setError)
                  : setShowReauthModal(true);
              }
            }}
            textStyle={styles.textStyle}
            title={"Submit"}
          />
        </View>
        <ReauthModal
          error={reauthError}
          onCancel={() => setShowReauthModal(false)}
          onSubmit={(pass: string) => changeEmail(pass)}
          visible={showReauthModal}
        />
        <CustomAlert
          errorMsg={error.message}
          hideModal={_hideModal}
          showModal={error.showErrorModal}
          onPressOk={error?.onPress}
        />
      </Screen>
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
    borderRadius: 999,
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
