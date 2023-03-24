import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SignInScreen from "../../screens/Authorization/Sign_in/SingIn";
describe("SignInScreen", () => {
  it("should render the SignInScreen component", () => {
    const { getByTestId } = render(<SignInScreen />);
    expect(getByTestId("signin-screen")).toBeTruthy();
  });

  it("should render the Logo component", () => {
    const { getByTestId } = render(<SignInScreen />);
    expect(getByTestId("logo")).toBeTruthy();
  });

  it("should render the Input components", () => {
    const { getByTestId } = render(<SignInScreen />);
    expect(getByTestId("input-email")).toBeTruthy();
    expect(getByTestId("input-password")).toBeTruthy();
  });

  it("should render the ForgotPassword component", () => {
    const { getByTestId } = render(<SignInScreen />);
    expect(getByTestId("forgot-password")).toBeTruthy();
  });

  it("should render the Button component", () => {
    const { getByTestId } = render(<SignInScreen />);
    expect(getByTestId("button-signin")).toBeTruthy();
  });

  it("should call the user_signIn function when the button is pressed", () => {
    const mockFn = jest.fn();
    const { getByTestId } = render(<SignInScreen user_signIn={mockFn} />);
    fireEvent.press(getByTestId("button-signin"));
    expect(mockFn).toHaveBeenCalled();
  });
});
