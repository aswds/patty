import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { auth } from "../../../../../firebase";
import { ProfileStackScreenNavigationProps } from "../../../../Types/ProfileStack/ScreenNavigationProps";
import { Screen } from "../../../../shared/Screen/Screen";
import BoldText from "../../../../shared/Text/BoldText";
import { colors } from "../../../../src/colors";
import { set_errorMsg_errorType } from "../../../Authorization/Sign_up/Sign_up_screens/Sign_up_Functions/signUp";
import NavigationBar from "../../../Map/PartyCreationScreens/NavigationBar";
import ChangePasswordScreen from "../../../VerifyEmail/ChangeEmail";

const ChangePassword: React.FC<
  ProfileStackScreenNavigationProps<"ChangePassword">
> = ({ navigation }) => {
  const [emailVerified, setEmailVerified] = useState<boolean>(
    auth.currentUser?.emailVerified!
  );

  useEffect(() => {
    auth.currentUser?.reload();
    setEmailVerified(auth.currentUser?.emailVerified!);
  }, []);
  async function passRecovery(userEmail, setError) {
    const auth = getAuth();
    sendPasswordResetEmail(auth, userEmail)
      .then(async () => {
        setError({
          message: "We've sent you a letter to reset password",
          setShowAlert: true,
          onPress: () => navigation.goBack(),
        });
      })
      .catch((e) => {
        console.error(e);
        set_errorMsg_errorType(e.code).catch((e) => {
          setError({
            message: e.message,
            setShowAlert: true,
          });
        });
      });
  }
  return (
    <>
      {emailVerified ? (
        <ChangePasswordScreen
          isPasswordReset
          passRecoveryFunction={passRecovery(userEmail)}
          navigationBack={navigation}
        />
      ) : (
        <Screen
          navigationBar={
            <NavigationBar text="Change password" navigation={navigation} />
          }
        >
          <View style={{ flex: 1, justifyContent: "center" }}>
            <BoldText>
              You have to verify email before changing password
            </BoldText>
          </View>
        </Screen>
      )}
    </>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  textInputStyle: {
    borderBottomWidth: 1,
    borderColor: colors.text,
    color: colors.text,
    fontFamily: FontFamily.bold,
    padding: 10,
  },
});
