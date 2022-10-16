import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import StyledButton from "../components/button";
import { Logo } from "../components/Logo";
import { Input } from "../Sign_in/SignInComponents/Input";
import { style } from "../style";
import { Container } from "./Sign_up_components/Container";
import { Screen } from "./Sign_up_components/Screen";
import { TermText } from "./Sign_up_components/TermText";
import { sameUsernames } from "./Sign_up_screens/Sign_up_Functions/sameUsername";
import { signUpHandle } from "./Sign_up_screens/Sign_up_Functions/signUp";
import { checkPassword } from "./Sign_up_screens/Sign_up_Functions/Validator";
const SignUpScreen = (props) => {
  const [username, setUsername] = useState("");
  const [valid, setValid] = useState({
    validUsername: true,
    validPassword: true,
    validEmail: true,
  });
  const [user, setUser] = useState({
    email: null,
    password: null,
  });

  const [confirmPass, setConfirmPass] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const navigation = useNavigation();
  const route = useRoute();
  const name = route.params?.name;
  const image = route.params?.image;

  const loader = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
    clearTimeout();
  };
  function refHandle(ref_input) {
    ref_input.current.focus();
  }
  return (
    <Screen>
      <View>
        <Logo />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingViewStyle}
      >
        <Container>
          <Input
            isValid={valid.validUsername}
            style={styles.inputStyle}
            icon={
              <AntDesign
                name="user"
                size={Dimensions.get("window").height >= 800 ? 24 : 20}
                color="black"
              />
            }
          >
            <TextInput
              style={{
                ...styles.inputField,
              }}
              placeholder="Username"
              placeholderTextColor={style.color}
              onChangeText={(text) => {
                setUsername(text);
                sameUsernames(text, setUsernameError).then((res) => {
                  console.log(res);
                  setValid({ ...valid, validUsername: res });
                });
              }}
              onSubmitEditing={() => {
                refHandle(ref_input2);
              }}
              defaultValue={username}
            />
          </Input>

          <Input
            style={styles.inputStyle}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={Dimensions.get("window").height >= 800 ? 24 : 20}
                color="black"
              />
            }
            isValid={valid.validEmail}
          >
            <TextInput
              style={{
                ...styles.inputField,
              }}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Email"
              placeholderTextColor={style.color}
              onEndEditing={() => {
                // similarEmail(user.email);
              }}
              onSubmitEditing={() => {
                refHandle(ref_input3);
              }}
              onChangeText={(text) => {
                setUser({ ...user, email: text });
                setValid({ ...valid, validEmail: true });
              }}
              value={user.email}
              ref={ref_input2}
            />
          </Input>

          <Input
            isValid={valid.validPassword}
            style={styles.inputStyle}
            icon={
              showPassword ? (
                <Feather
                  name="eye-off"
                  size={Dimensions.get("window").height >= 800 ? 24 : 20}
                  color="black"
                  onPress={() => setShowPassword(false)}
                />
              ) : (
                <Feather
                  name="eye"
                  size={Dimensions.get("window").height >= 800 ? 24 : 20}
                  color="black"
                  onPress={() => setShowPassword(true)}
                />
              )
            }
          >
            <TextInput
              style={styles.inputField}
              secureTextEntry={showPassword}
              placeholder="Password"
              placeholderTextColor={style.color}
              onChangeText={(text) => {
                setUser({ ...user, password: text });
                // checkPassword(text, setValid, setPasswordError);
              }}
              onSubmitEditing={() => {
                refHandle(ref_input4);
              }}
              value={user.password}
              ref={ref_input3}
            />
          </Input>

          {/* {valid.validPassword ? null : (
            <Animatable.View
              animation="fadeInLeft"
              duration={500}
              style={styles.animationStyle}
            >
              <Text
                style={{ color: "lightgrey" }}
                onPress={() => {
                  navigation.navigate("PasswordRules");
                }}
              >
                Check password rules here 👀
              </Text>
            </Animatable.View>
          )} */}
          <Input
            style={styles.inputStyle}
            isValid={valid.validPassword}
            icon={
              <MaterialCommunityIcons
                name="lock-check"
                size={Dimensions.get("window").height >= 800 ? 24 : 20}
                color="black"
              />
            }
          >
            <TextInput
              style={styles.inputField}
              autoCapitalize="none"
              secureTextEntry={showPassword}
              placeholder="Confirm your password"
              placeholderTextColor={style.color}
              onChangeText={(text) => setConfirmPass(text)}
              defaultValue={confirmPass}
              ref={ref_input4}
            />
          </Input>
        </Container>

        <StyledButton
          textStyle={{
            fontFamily: "Nunito-Bold",
            fontSize: 20,
            color: "#E7E0C9",
          }}
          style={styles.styledButton}
          onPress={() => {
            if (
              valid.validEmail &&
              valid.validPassword &&
              valid.validUsername &&
              user.password == confirmPass
            ) {
              signUpHandle(user.email, user.password, username, name, image);
            }
          }}
        >
          Sign Up
        </StyledButton>
        {/* Fix */}
        <TermText />
        {/* Fix */}
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputStyle: { width: "100%", height: "16%" },
  errorMsg: {
    color: "red",
  },
  registerContainer: {
    marginTop: "5%",
    height: Dimensions.get("window").height / 2.2,
    width: Dimensions.get("window").width / 1.3,
    justifyContent: "center",
  },

  textContainer: {
    justifyContent: "center",
    paddingBottom: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    fontVariant: ["small-caps"],
  },

  inputField: {
    width: Dimensions.get("window").width / 2.1,
    height: Dimensions.get("window").height / 13,
    justifyContent: "center",
    borderRadius: 20,
    fontSize: 13,
    fontFamily: "WorkSans-Medium",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    marginTop: 20,
    height: 80,
    width: 75,
    shadowOpacity: 0.4,
    shadowOffset: { height: 2, width: 0 },
  },
  keyboardAvoidingViewStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  animationStyle: {
    width: Dimensions.get("window").width / 1.5,
    justifyContent: "center",
    padding: 10,
  },
  styledButton: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 13,
    backgroundColor: "rgba(155 , 50, 50 , 1)",
    height: Dimensions.get("window").height / 14,
    width: Dimensions.get("window").width / 1.2,
    alignSelf: "center",
  },
});

export default SignUpScreen;
