import { useState } from "react";
import auth, { RecaptchaVerifier } from "@firebase/auth";
import {
  PhoneAuthProvider,
  getAuth,
  signInWithCredential,
} from "firebase/auth";
import { Button, TextInput, View } from "react-native";

interface SignUpState {
  phoneNumber: string;
  verificationCode: string;
}

const SignUp = () => {
  const [state, setState] = useState<SignUpState>({
    phoneNumber: "",
    verificationCode: "",
  });
  const [verificationId, setVerificationId] = useState("");

  const handlePhoneNumberChange = (phoneNumber: string) => {
    setState((prevState) => ({
      ...prevState,
      phoneNumber,
    }));
  };

  const handleVerificationCodeChange = (verificationCode: string) => {
    setState((prevState) => ({
      ...prevState,
      verificationCode,
    }));
  };

  const handleSignUp = async () => {
    const auth = getAuth();
    const phoneProvider = new PhoneAuthProvider(auth);
    const recaptchaVerifier = new RecaptchaVerifier(
      "invisible",

      // Optional reCAPTCHA parameters.
      {
        size: "normal",
        callback: function () {
          // reCAPTCHA solved, you can proceed with
          // phoneAuthProvider.verifyPhoneNumber(...).
        },
        "expired-callback": function () {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        },
      },
      auth
    );
    const verificationId = await phoneProvider.verifyPhoneNumber(
      state.phoneNumber,
      recaptchaVerifier
    );
    setVerificationId(verificationId);
  };

  const handleVerificationCodeSubmit = async () => {
    const auth = getAuth();
    const credential = PhoneAuthProvider.credential(
      verificationId,
      state.verificationCode
    );
    await signInWithCredential(auth, credential);
  };

  return (
    <View
      style={{ flex: 1, justifyContent: "center", backgroundColor: "black" }}
    >
      <TextInput
        value={state.phoneNumber}
        onChangeText={handlePhoneNumberChange}
        style={{ backgroundColor: "yellow" }}
      />
      <Button onPress={handleSignUp} title="Sign Up" />
      <TextInput
        value={state.verificationCode}
        onChangeText={handleVerificationCodeChange}
        style={{ backgroundColor: "yellow" }}
      />
      <Button onPress={handleVerificationCodeSubmit} title="Submit" />
    </View>
  );
};

export default SignUp;
