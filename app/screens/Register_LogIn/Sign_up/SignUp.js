import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import React, { useContext, useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { AuthContext } from "../../../navigation/SignIn&SingUp/components/AuthContext";
import { colors } from "../../../src/colors";
import { isAndroid } from "../../../src/platform";
import { BackButton } from "../components/BackButton";
import Button from "../components/button";
import Input from "../../../shared/Input/Input";
import { Logo } from "../components/Logo";
import { Screen } from "../components/Screen";
import CustomAlert from "../CustomAlert";
import { textStyle } from "../style";
import { Container } from "./Sign_up_components/Container";
import { TermText } from "./Sign_up_components/TermText";
import { error_handle } from "./Sign_up_screens/Sign_up_Functions/error_handle";
import { signUpHandle } from "./Sign_up_screens/Sign_up_Functions/signUp";

const SignUpScreen = (props) => {
  const { navigation } = props;
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
  const [errorMsg, setErrorMsg] = useState();
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
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
      user.password === confirmPass
    ) {
      //handling sign up
      signUpHandle(
        user.email.trim(),
        user.password.trim(),
        username,
        name,
        surname,
        image,
        signUp
      ).catch((err) => {
        //if error occurs, show modal
        error_handle(err.error_type, err.message, {
          setValid,
          valid,
        }).catch((err) => {
          setShowModal(true);
          setErrorMsg(err);
        });
      });
    } else {
      setShowModal(true);
      setErrorMsg("Please check if everything is correct :)");
    }
  }
  function refHandle(ref_input) {
    ref_input.current.focus();
  }
  function PasswordIcon() {
    return showPassword ? (
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
    );
  }

  return (
    <Screen>
      <View>
        <Logo />
      </View>
      <BackButton navigation={navigation} />

      <Container>
        <Input
          style={styles.inputStyle}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={Dimensions.get("window").height >= 800 ? 24 : 20}
              color={colors.iconColor}
            />
          }
          autoComplete={false}
          isValid={valid.validEmail}
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
          inputStyle={{
            ...styles.inputField,
          }}
        />

        <Input
          isValid={valid.validPassword}
          style={styles.inputStyle}
          icon={<PasswordIcon />}
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
          inputStyle={styles.inputField}
        />

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
          inputStyle={styles.inputField}
        />
      </Container>
      <Button
        textStyle={{
          fontFamily: "Nunito-Bold",
          fontSize: 20,
          color: "#E7E0C9",
        }}
        style={styles.styledButton}
        onPress={signUp_handle}
      >
        Sign Up
      </Button>
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
  inputStyle: {
    width: "100%",
    height: isAndroid ? Dimensions.get("window").height * 0.1 : "20%",
  },
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
    marginBottom: 20,
    borderRadius: 13,
    backgroundColor: "rgba(155 , 50, 50 , 1)",
    height: isAndroid ? "10%" : 70,
    width: "80%",
    alignSelf: "center",
  },
});

export default SignUpScreen;
