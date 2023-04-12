import { Feather, FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Keyboard, View } from "react-native";
import { colors } from "../../../../src/colors";
import { BackButton } from "../../../../shared/Buttons/BackButton";
import Button from "../../components/Button";
import Input from "../../../../shared/Input/Input";
import { Logo } from "../../components/Logo";
import CustomAlert from "../../CustomAlert";
import { textStyle } from "../../style";
import SignInScreen from "../SingIn";
import ForgotPassword from "../SignInComponents/ForgotPassword";
import { user_signIn } from "../SignInComponents/SignInFuncs/signInFunction";
import { SignInScreenNavigationProps } from "../../../../Types/Authorization/SignIn/ScreenNavigationProps";
import Screen from "../../../Profile/components/Screen";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SafeAreaProvider } from "react-native-safe-area-context";
describe("SignInScreen", () => {
  let navigation: SignInScreenNavigationProps;
  beforeEach(() => {
    navigation = {
      navigate: jest.fn(),
    };
  });

  it("should render the screen correctly", async () => {
    const { getByTestId } = render(<SignInScreen navigation={navigation} />);
    expect(getByTestId("screen")).toBeTruthy();
  });

  it("should call the sign in function when the button is pressed", async () => {
    const { getByTestId } = render(<SignInScreen navigation={navigation} />);
    const signInButton = getByTestId("sign-in-button");
    const signInFunc = jest.spyOn(SignInScreen, "user_signIn");
    fireEvent.press(signInButton);
    expect(signInFunc).toHaveBeenCalled();
  });

  it("should show an error message if the email or password is invalid", async () => {
    const { getByTestId } = render(<SignInScreen navigation={navigation} />);
    const signInButton = getByTestId("sign-in-button");
    fireEvent.press(signInButton);
    const alert = await waitFor(() => getByTestId("alert"));
    expect(alert).toBeTruthy();
  });
});
