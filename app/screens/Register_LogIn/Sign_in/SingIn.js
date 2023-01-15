import { Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Keyboard, TextInput, View } from "react-native";

import { AuthContext } from "../../../navigation/SignIn&SingUp/components/AuthContext";
import { colors } from "../../../src/colors";
import { BackButton } from "../components/BackButton";
import StyledButton from "../components/button";
import { Input } from "../components/Input";
import { Logo } from "../components/Logo";
import { Screen } from "../components/Screen";
import CustomAlert from "../CustomAlert";
import { textStyle } from "../style";
import ForgotPassword from "./SignInComponents/ForgotPassword";
import { user_signIn } from "./SignInComponents/SignInFuncs/signInFunction";
import { styles } from "./styles";
const SignInScreen = (props) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState({ isValid: true, errorMsg: "" });
  const [password, setPassword] = useState({ isValid: true, errorMsg: "" });
  const [errorMsg, setErrorMsg] = useState();
  const [userPassword, setUserPassword] = useState("");
  const [userLogin, setUserLogin] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [_showModal, setShowModal] = useState(false);

  const [isLoggedin, setLoggedinStatus] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isImageLoading, setImageLoadStatus] = useState();
  const _hideModal = () => {
    setShowModal(false);
  };
  const _hideRecModal = () => {
    setShowRecModal(false);
  };
  const _clearMsg = () => {
    setErrorMsg();
  };
  const iconSize = 24;
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
  const { signIn } = useContext(AuthContext);

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
              onChangeText={(email) => {
                setUserLogin(email);
                setEmail({ ...email, isValid: true });
              }}
              defaultValue={userLogin}
              autoCapitalize="none"
            />

            <Input
              isValid={password.isValid}
              icon={PasswordIcon}
              secureTextEntry={showPassword}
              placeholder="Password"
              placeholderTextColor={textStyle.color}
              onChangeText={(password) => {
                setUserPassword(password);
                setPassword({ ...password, isValid: true });
              }}
              defaultValue={userPassword}
              inputStyle={styles.inputField}
            />
            <ForgotPassword styles={styles} navigation={navigation} />
          </View>
        </View>
        <View style={styles.styledButtonContainer}>
          <StyledButton
            onPress={() => {
              user_signIn(
                setEmail,
                setPassword,
                setErrorMsg,
                setShowModal,
                userLogin,
                userPassword
              )
                .then(() => {
                  signIn();
                })
                .catch(() => {});
            }}
            style={styles.styledButtonStyle}
            textStyle={styles.styledButtonTextStyle}
          >
            Sign in
          </StyledButton>
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
