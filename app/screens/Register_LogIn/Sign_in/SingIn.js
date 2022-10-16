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
  ImageBackground,
} from "react-native";
import { Line } from "./SignInComponents/Line";
import CustomAlert from "../CustomAlert";
import { Input } from "./SignInComponents/Input";
import { Logo } from "../components/Logo";
// import SingInMethods from "./LoginComponents/SignInMethods";
import { style } from "../style";
import { styles } from "./styles";
import * as Haptics from "expo-haptics";
import StyledButton from "../components/button";
import { user_signIn } from "./signInFunction";
import RecoveryModal from "./SignInComponents/RecoveryModal";
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
    <ImageBackground
      source={require("../../../../assets/AE/background-02-01.png")}
      style={{ flex: 1, width: null, height: null }}
      blurRadius={35}
    >
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
                      );
                    }}
                    style={styles.styledButtonStyle}
                    textStyle={styles.styledButtonTextStyle}
                  >
                    Sign in
                  </StyledButton>
                </View>
              </View>

              <View style={styles.registerContainer}>
                <View style={style.textTerms}>
                  <Text style={style.textTermsStyle}>New user?{"  "}</Text>
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
        <RecoveryModal
          showModal={_showRecoveryModal}
          hideModal={_hideRecModal}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignInScreen;
