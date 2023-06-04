import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import React, { MutableRefObject, useRef, useState } from "react";
import { Dimensions, StyleSheet, TextInput, View } from "react-native";
import { colors } from "../../../src/colors";
import { isAndroid } from "../../../src/platform";
import { BackButton } from "../../../shared/Buttons/BackButton";
import Button from "../../../shared/Buttons/BigButton";
import Input from "../../../shared/Input/Input";
import { Logo } from "../components/Logo";
import CustomAlert from "../CustomAlert";
import { textStyle } from "../style";
import { TermText } from "../Initial_Screen/TermText";
import { error_handle } from "./Sign_up_screens/Sign_up_Functions/error_handle";
import { signUpHandle } from "./Sign_up_screens/Sign_up_Functions/signUp";
import { FontFamily } from "../../../../assets/fonts/Fonts";
import { SignUpRouteProps } from "../../../Types/Authorization/SignUp/RouteTypes";
import { SignUpStackScreenProps } from "../../../Types/Authorization/SignUp/ScreenNavigationProps";
import { Screen } from "../../../shared/Screen/Screen";
import Title from "../components/Title";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
type SignUpUser = {
  email: string | null;
  password: string | null;
};

const SignUpScreen = ({
  navigation,
}: SignUpStackScreenProps<"SignUpScreen">) => {
  const [valid, setValid] = useState({
    validUsername: true,
    validEmail: true,
    validPassword: true,
    validConfirmPassword: true,
  });
  const [user, setUser] = useState<SignUpUser>({
    email: null,
    password: null,
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>();
  const ref_input2 = useRef<TextInput>(null);
  const ref_input3 = useRef<TextInput>(null);
  const ref_input4 = useRef<TextInput>(null);
  const route = useRoute<SignUpRouteProps>();
  const name = route.params?.name;
  const surname = route.params?.surname;
  const username = route.params?.username;
  const image = route.params?.imageURI;

  const _hideModal = () => {
    setShowModal(false);
  };
  function signUp_handle() {
    if (
      valid.validEmail &&
      valid.validPassword &&
      user.password === confirmPass &&
      user.email
    ) {
      signUpHandle(
        user.email.trim(),
        user.password.trim(),
        username,
        name,
        surname,
        image
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
  function refHandle(ref_input: MutableRefObject<TextInput | null>) {
    ref_input?.current?.focus();
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
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <Screen style={{}}>
        <BackButton navigation={navigation} />

        <View style={{ flex: 1, justifyContent: "center" }}>
          <Title title="Congratulation! 🎉" message={`Just one step left!`} />
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
            value={user.email!}
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
            value={user.password!}
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
              if (user.password !== text) {
                setValid({ ...valid, validConfirmPassword: false });
              } else {
                setValid({ ...valid, validConfirmPassword: true });
              }
            }}
            defaultValue={confirmPass}
            ref={ref_input4}
            inputStyle={styles.inputField}
          />
        </View>
        {/* Fix */}
        {/* Fix */}

        <CustomAlert
          errorMsg={errorMsg!}
          hideModal={_hideModal}
          showModal={showModal}
        />
        <View style={styles.signUpButtonContainer}>
          <Button
            textStyle={{
              fontFamily: "Nunito-Bold",
              fontSize: 20,
              color: colors.buttonText,
            }}
            style={{ width: "100%", height: 60 }}
            onPress={signUp_handle}
            title={"Sign up"}
          />
        </View>
      </Screen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  signUpButtonContainer: {
    width: "100%",
    paddingVertical: 20,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.3,
  },
  inputStyle: {
    width: "100%",
    height: 60,
    color: colors.text,
  },
  errorMsg: {
    color: "red",
  },
  registerContainer: {
    marginTop: "5%",
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
    color: colors.text,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    borderRadius: 10,
    fontSize: 13,
    fontFamily: FontFamily.medium,
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
    width: "35%",
    marginTop: "10%",
    bottom: 10,
    right: 0,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    padding: 10,
    borderRadius: 40,
    marginHorizontal: 10,
    backgroundColor: colors.accentColor,
  },
});

export default SignUpScreen;
