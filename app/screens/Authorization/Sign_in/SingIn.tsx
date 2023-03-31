import { Feather, FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Keyboard, View } from "react-native";
import { colors } from "../../../src/colors";
import { BackButton } from "../../../shared/Buttons/BackButton";
import Button from "../components/Button";
import Input from "../../../shared/Input/Input";
import { Logo } from "../components/Logo";
import { Screen } from "../components/Screen";
import CustomAlert from "../CustomAlert";
import { textStyle } from "../style";
import ForgotPassword from "./SignInComponents/ForgotPassword";
import { user_signIn } from "./SignInComponents/SignInFuncs/signInFunction";
import { styles } from "./styles";
import { SignInScreenNavigationProps } from "../../../Types/Authorization/SignIn/ScreenNavigationProps";

const SignInScreen = ({ navigation }: SignInScreenNavigationProps) => {
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
      <Screen styles={styles} keyboardDismiss={Keyboard.dismiss}>
        <BackButton navigation={navigation} />
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <View style={styles.loginContainer}>
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
              style={{ height: 60 }}
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
              style={{ height: 60 }}
            />
            <ForgotPassword styles={styles} navigation={navigation} />
          </View>
        </View>
        <View style={styles.styledButtonContainer}>
          <Button
            onPress={() => {
              user_signIn(
                setEmail,
                setPassword,
                setErrorMsg,
                setShowModal,
                userLogin,
                userPassword
              );
            }}
            style={styles.styledButtonStyle}
            textStyle={styles.styledButtonTextStyle}
            title={"Sign in"}
          />
        </View>
      </Screen>

      <CustomAlert
        errorMsg={errorMsg}
        hideModal={_hideModal}
        showModal={_showModal}
        clearMsg={_clearMsg}
      />
    </>
  );
};

export default SignInScreen;
