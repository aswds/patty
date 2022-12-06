import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useRef, useState } from "react";
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
import { AuthContext } from "../../../navigation/SignIn&SingUp/components/AuthContext";
import { colors } from "../../../src/colors";
import StyledButton from "../components/button";
import { Input } from "../components/Input";
import { Logo } from "../components/Logo";
import { Screen } from "../components/Screen";
import CustomAlert from "../CustomAlert";
import { style, textStyle } from "../style";
import { Container } from "./Sign_up_components/Container";
import { TermText } from "./Sign_up_components/TermText";
import { BackButton } from "../components/BackButton";
import { error_handle } from "./Sign_up_screens/Sign_up_Functions/error_handle";
import { sameUsernames } from "./Sign_up_screens/Sign_up_Functions/sameUsername";
import { signUpHandle } from "./Sign_up_screens/Sign_up_Functions/signUp";
import { checkPassword } from "./Sign_up_screens/Sign_up_Functions/Validator";
const SignUpScreen = (props) => {
  const [valid, setValid] = useState({
    validUsername: true,
    validEmail: true,
    validPassword: true,
    validConfirmPassword: true,
  });
  const [user, setUser] = useState({
    email: null,
    password: null,
  });
  const [showModal, setShowModal] = useState(false);
  const [confirmPass, setConfirmPass] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [errorMsg, setErrorMsg] = useState();
  const [userError, setUsernameError] = useState();
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const navigation = useNavigation();
  const route = useRoute();
  const name = route.params?.name;
  const surname = route.params?.surname;
  const username = route.params?.username;
  const image = route.params?.userImage;

  const { signUp } = useContext(AuthContext);
  const _hideModal = () => {
    setShowModal(false);
  };
  function signUp_handle() {
    if (
      valid.validEmail &&
      valid.validPassword &&
      user.password == confirmPass
    ) {
      signUpHandle(
        user.email,
        user.password,
        username,
        name,
        surname,
        image
      ).catch((err) => {
        error_handle(err.error_type, err.message, {
          setValid,
          valid,
        }).catch((err) => {
          setShowModal(true), setErrorMsg(err);
        });
      });
    } else {
      setShowModal(true),
        setErrorMsg("Please check if everything is correct :)");
    }
  }
  function refHandle(ref_input) {
    ref_input.current.focus();
  }

  return (
    <Screen>
      <View style={{ bottom: "10%" }}>
        <Logo />
      </View>
      <BackButton navigation={navigation} />

      <Container>
        {/* <Input
          isValid={valid.validUsername}
          style={styles.inputStyle}
          icon={
            <AntDesign
              name="user"
              size={Dimensions.get("window").height >= 800 ? 24 : 20}
              color={colors.iconColor}
            />
          }
        >
          <TextInput
            style={{
              ...styles.inputField,
            }}
            placeholder="Username"
            placeholderTextColor={textStyle.color}
            onChangeText={(text) => {
              setUsername(text);
            }}
            onEndEditing={() => {
              sameUsernames(username.trim(), setErrorMsg)
                .then((res) => {
                  setValid({ ...valid, validUsername: res });
                })
                .catch((err) => {
                  setValid({ ...valid, validUsername: err }),
                    setShowModal(!err);
                });
            }}
            onSubmitEditing={() => {
              refHandle(ref_input2);
            }}
            defaultValue={username}
          />
        </Input> */}

        <Input
          style={styles.inputStyle}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={Dimensions.get("window").height >= 800 ? 24 : 20}
              color={colors.iconColor}
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
            placeholderTextColor={textStyle.color}
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
                color={colors.iconColor}
                onPress={() => setShowPassword(false)}
              />
            ) : (
              <Feather
                name="eye"
                size={Dimensions.get("window").height >= 800 ? 24 : 20}
                color={colors.iconColor}
                onPress={() => setShowPassword(true)}
              />
            )
          }
        >
          <TextInput
            style={styles.inputField}
            secureTextEntry={showPassword}
            placeholder="Password"
            placeholderTextColor={textStyle.color}
            onChange={() => {
              setValid({ ...valid, validPassword: true });
            }}
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
        <Input
          style={styles.inputStyle}
          isValid={valid.validConfirmPassword}
          icon={
            <MaterialCommunityIcons
              name="lock-check"
              size={Dimensions.get("window").height >= 800 ? 24 : 20}
              color={colors.iconColor}
            />
          }
        >
          <TextInput
            style={styles.inputField}
            autoCapitalize="none"
            secureTextEntry={showPassword}
            placeholder="Confirm your password"
            placeholderTextColor={textStyle.color}
            onChangeText={(text) => {
              setConfirmPass(text);

              if (user.password != text) {
                setValid({ ...valid, validConfirmPassword: false });
              } else {
                setValid({ ...valid, validConfirmPassword: true });
              }
            }}
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
        onPress={signUp_handle}
      >
        Sign Up
      </StyledButton>
      {/* Fix */}
      <TermText />
      {/* Fix */}
      <CustomAlert
        errorMsg={errorMsg}
        hideModal={_hideModal}
        showModal={showModal}
        setErrorMsg={setErrorMsg}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputStyle: { width: "100%", height: "22%" },
  errorMsg: {
    color: "red",
  },
  registerContainer: {
    marginTop: "5%",
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
    color: "white",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    borderRadius: 10,
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

  animationStyle: {
    width: Dimensions.get("window").width / 1.5,
    justifyContent: "center",
    padding: 10,
  },
  styledButton: {
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 13,
    backgroundColor: "rgba(155 , 50, 50 , 1)",
    height: Dimensions.get("window").height / 14,
    width: Dimensions.get("window").width / 1.2,
    alignSelf: "center",
  },
});

export default SignUpScreen;
