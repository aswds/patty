import { Feather, FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Keyboard, View } from "react-native";
import { colors } from "../../../src/colors";
import { BackButton } from "../../../shared/Buttons/BackButton";
import Button from "../../../shared/Buttons/BigButton";
import Input from "../../../shared/Input/Input";
import { Logo } from "../components/Logo";
import CustomAlert from "../../../shared/Alert/CustomAlert";
import { textStyle } from "../style";
import ForgotPassword from "./SignInComponents/ForgotPassword";
import { user_signIn } from "./SignInComponents/SignInFuncs/signInFunction";
import { styles } from "./styles";
import { Screen } from "../../../shared/Screen/Screen";
import { SignInStackScreenProps } from "../../../Types/Authorization/SignIn/ScreenNavigationProps";
import Loader from "../../../shared/Loaders/Loader";

const SignInScreen = ({
  navigation,
}: SignInStackScreenProps<"SignInScreen">) => {
  // States for email and password validation
  const [email, setEmail] = useState({ isValid: true, errorMsg: "" });
  const [password, setPassword] = useState({ isValid: true, errorMsg: "" });
  // State for error message
  const [errorMsg, setErrorMsg] = useState<string>();
  // States for user login and password
  const [userPassword, setUserPassword] = useState<string>("");
  const [userLogin, setUserLogin] = useState<string>("");
  // State for show password
  const [showPassword, setShowPassword] = useState<boolean>(true);
  // State for show modal
  const [_showModal, setShowModal] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  // Function to hide modal
  const _hideModal = () => {
    setShowModal(false);
  };

  // Function to clear error message
  const _clearMsg = () => {
    setErrorMsg("");
  };
  // Icon size
  const iconSize = 24;
  // Icons for input fields
  const UserIcon = (
    <FontAwesome name="user-o" size={iconSize} color={colors.iconColor} />
  );
  const PasswordIcon = (
    <Feather
      name={showPassword ? "eye-off" : "eye"}
      size={iconSize}
      color={colors.iconColor}
      onPress={() => setShowPassword(!showPassword)}
    />
  );

  return (
    <>
      <Screen>
        <BackButton navigation={navigation} />
        <View style={styles.loginContainer}>
          <View style={styles.logoContainer}>
            <Logo />
          </View>
          <View style={styles.innerText}>
            <Input
              isValid={email.isValid}
              icon={UserIcon}
              inputStyle={styles.inputField}
              keyboardType="email-address"
              placeholderTextColor={textStyle.color}
              placeholder="Enter e-mail"
              onChangeText={(email: string) => {
                setUserLogin(email);
                setEmail({ errorMsg: "", isValid: true });
              }}
              defaultValue={userLogin}
              autoCapitalize="none"
              style={{ height: 60, width: "100%" }}
            />

            <Input
              isValid={password.isValid}
              icon={PasswordIcon}
              secureTextEntry={showPassword}
              placeholder="Password"
              placeholderTextColor={textStyle.color}
              onChangeText={(password) => {
                setUserPassword(password);
                setPassword({ errorMsg: "", isValid: true });
              }}
              defaultValue={userPassword}
              inputStyle={styles.inputField}
              style={{ height: 60, width: "100%" }}
            />
            <ForgotPassword styles={styles} navigation={navigation} />
          </View>
        </View>
        <Button
          testID="sign-in-button"
          onPress={async () => {
            await user_signIn(
              setEmail,
              setPassword,
              setErrorMsg,
              setShowModal,
              setShowLoader,
              userLogin,
              userPassword
            );
          }}
          style={styles.styledButtonStyle}
          textStyle={styles.styledButtonTextStyle}
          title={"Sign in"}
        />
      </Screen>
      <CustomAlert
        title="Error"
        errorMsg={errorMsg!}
        hideModal={_hideModal}
        showModal={_showModal}
      />
      {!_showModal && showLoader && (
        <Loader
          isVisible={!_showModal && showLoader}
          containerStyle={{ zIndex: 0 }}
        />
      )}
    </>
  );
};

export default SignInScreen;
