import {
  AntDesign,
  Feather,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
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
} from "react-native";
import { Line } from "./SignInComponents/Line";
import CustomAlert from "../CustomAlert";
import { Input } from "./SignInComponents/Input";
import { Logo } from "./SignInComponents/LoginLogo";
// import SingInMethods from "./LoginComponents/SignInMethods";
import { style } from "../style";
import { styles } from "./styles";
import * as Haptics from "expo-haptics";
import StyledButton from "../components/button";
const SignInScreen = (props) => {
  const navigation = useNavigation();

  const [email, setEmail] = useState({ isValid: true, errorMsg: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState({ isValid: true, errorMsg: "" });
  const [errorMsg, setErrorMsg] = useState();
  const [userPassword, setUserPassword] = useState("");
  const [userLogin, setUserLogin] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [_showModal, setShowModal] = useState(false);
  const [singInModal, setSignInModal] = useState(false);

  const [isLoggedin, setLoggedinStatus] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isImageLoading, setImageLoadStatus] = useState();

  // const signIn = (email, password) => {
  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email.trim(), password)
  //     .then((result) => {
  //       const user = result.user;
  //       console.log("Logged in with:" + user.email);
  //     })
  //     .catch((error) => {
  //       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  //       console.log(error.code);
  //       if (error.code == "auth/invalid-email") {
  //         setErrorMsg(
  //           "The format of your email address is not correct please enter your correct email address to proceed."
  //         ),
  //           setEmail(false);
  //         setShowModal(true);
  //       } else if (error.code == "auth/wrong-password") {
  //         setPassword({
  //           isValid: false,
  //         }),
  //           setErrorMsg(
  //             "Sorry, you entered the wrong password. Check your password again."
  //           ),
  //           setShowModal(true);
  //       } else if (error.code == "auth/user-not-found") {
  //         setErrorMsg(
  //           "The email you entered does not belong to the account. Check your username and try again."
  //         ),
  //           setEmail(false);
  //         setShowModal(true);
  //       }
  //     });
  // };

  const _hideModal = () => {
    setShowModal(false);
  };
  const _hideSignInModal = () => {
    setSignInModal(false);
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
  return (
    <SafeAreaView style={styles.linearGradientStyle}>
      <StatusBar barStyle={"light-content"} />
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{ justifyContent: "space-between", paddingTop: "10%" }}
            >
              <View style={styles.logoContainer}>
                <Logo />
              </View>
              <View style={styles.loginContainer}>
                <View style={styles.innerText}>
                  <Input isValid={email.isValid} icon={UserIcon}>
                    <TextInput
                      keyboardType="email-address"
                      style={styles.inputField}
                      placeholderTextColor={style.color}
                      placeholder="Enter e-mail"
                      onChangeText={(email) => {
                        setUserLogin(email);
                        // setEmail({ ...email, isValid: true });
                      }}
                      defaultValue={userLogin}
                      autoCapitalize="none"
                    />
                  </Input>

                  {/* {email.isValid ? null : (
                  <Animatable.View
                    animation="fadeInLeft"
                    duration={500}
                    style={styles.animationStyle}
                  >
                    <Text style={styles.errorMsg}>{email.errorMsg}</Text>
                  </Animatable.View>
                )} */}
                  <Input isValid={password.isValid} icon={PasswordIcon}>
                    <TextInput
                      style={styles.inputField}
                      secureTextEntry={showPassword}
                      placeholder="Password"
                      placeholderTextColor={style.color}
                      onChangeText={(password) => {
                        setUserPassword(password);
                        //  setPassword(true);
                      }}
                      defaultValue={userPassword}
                    />
                  </Input>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("DataRecovery");
                    }}
                    style={{ alignSelf: "flex-end", paddingVertical: 10 }}
                  >
                    <Text style={{ color: "#416194", fontSize: 13 }}>
                      Forgot a password ?
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.styledButtonContainer}>
                <StyledButton
                  onPress={() => {
                    signIn(userLogin, userPassword);
                  }}
                  style={{
                    height: 50,
                    borderRadius: 10,
                    flex: 1,
                  }}
                  textStyle={{
                    fontFamily: "Nunito-Bold",
                    fontSize: 20,
                    color: "#E7E0C9",
                  }}
                >
                  Sign in
                </StyledButton>
              </View>
            </View>
            <Line />
            {/* <SingInMethods
              loginWithfacebook={{}}
              loginWithApple={{}}
              loginWithGoogle={{}}
            /> */}
            <View style={styles.registerContainer}>
              <View style={style.textTerms}>
                <Text style={style.textTermsStyle}>New user? </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("NameInfo");
                  }}
                >
                  <Text
                    style={{
                      ...style.textTermsStyle,
                      fontSize: 15,
                      color: "#416194",
                    }}
                  >
                    Sign up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </TouchableWithoutFeedback>
      <CustomAlert
        errorMsg={errorMsg}
        hideModal={_hideModal}
        showModal={_showModal}
      />
    </SafeAreaView>
  );
};

export default SignInScreen;
