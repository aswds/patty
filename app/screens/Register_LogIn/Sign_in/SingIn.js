import {
  AntDesign,
  Feather,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useReducer, useState, useEffect, useContext } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StatusBar,
  ImageBackground,
} from "react-native";
import Screen from "./SignInComponents/Screen";
import CustomAlert from "../CustomAlert";
import { Input } from "./SignInComponents/Input";
import { Logo } from "../components/Logo";
// import SingInMethods from "./LoginComponents/SignInMethods";
import { textStyle } from "../style";
import { styles } from "./styles";
import * as Haptics from "expo-haptics";
import StyledButton from "../components/button";
import { user_signIn } from "./SignInComponents/SignInFuncs/signInFunction";
import RecoveryModal from "./SignInComponents/RecoveryModal";
import { AuthReducer, initialState } from "../../../redux/AuthReducer";
import {
  AuthContext,
  AuthContextProvider,
} from "../../../navigation/SignIn&SingUp/components/AuthContext";
import SignUpContainer from "./SignInComponents/SignUpContainer";
import Loader from "../components/Loader";
import isEmpty from "./SignInComponents/SignInFuncs/isEmpty";
const SignInScreen = (props) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState({ isValid: true, errorMsg: "" });
  const [password, setPassword] = useState({ isValid: true, errorMsg: "" });
  const [errorMsg, setErrorMsg] = useState();
  const [userPassword, setUserPassword] = useState("");
  const [userLogin, setUserLogin] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [_showModal, setShowModal] = useState(false);
  const [_showRecoveryModal, setShowRecModal] = useState(false);

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
  const iconColor = "#6D6D6D";
  const iconSize = 24;
  const UserIcon = (
    <FontAwesome name="user-o" size={iconSize} color={iconColor} />
  );
  const PasswordIcon = (
    <Feather
      name={showPassword ? "eye-off" : "eye"}
      size={iconSize}
      color={iconColor}
      onPress={() => setShowPassword(!showPassword)}
    />
  );
  const { signIn } = useContext(AuthContext);
  const { isLoading } = useContext(AuthContext);

  return (
    <>
      <Screen styles={styles} keyboardDismiss={Keyboard.dismiss}>
        <View style={{ paddingTop: "10%" }}>
          <View style={styles.logoContainer}>
            <Logo />
          </View>
          <View style={styles.loginContainer}>
            <View style={styles.innerText}>
              <Input isValid={email.isValid} icon={UserIcon}>
                <TextInput
                  keyboardType="email-address"
                  style={styles.inputField}
                  placeholderTextColor={textStyle.color}
                  placeholder="Enter e-mail"
                  onChangeText={(email) => {
                    setUserLogin(email);
                    setEmail({ ...email, isValid: true });
                  }}
                  defaultValue={userLogin}
                  autoCapitalize="none"
                />
              </Input>
              <Input isValid={password.isValid} icon={PasswordIcon}>
                <TextInput
                  style={styles.inputField}
                  secureTextEntry={showPassword}
                  placeholder="Password"
                  placeholderTextColor={textStyle.color}
                  onChangeText={(password) => {
                    setUserPassword(password);
                    setPassword({ ...password, isValid: true });
                  }}
                  defaultValue={userPassword}
                />
              </Input>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("DataRecovery");
                }}
                style={styles.forgotPasswordContainer}
              >
                <Text style={styles.forgotPasswordTextStyle}>
                  Forgot a password ?
                </Text>
              </TouchableOpacity>
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
        </View>

        <SignUpContainer
          styles={styles}
          navigation={navigation}
          textStyle={textStyle}
        />
      </Screen>
      <CustomAlert
        errorMsg={errorMsg}
        hideModal={_hideModal}
        showModal={_showModal}
        clearMsg={_clearMsg}
      />
      <RecoveryModal showModal={_showRecoveryModal} hideModal={_hideRecModal} />
    </>
  );
};

export default SignInScreen;
