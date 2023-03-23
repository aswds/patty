import {
  NavigationContainer,
  useNavigationContainerRef,
  useTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import InitialScreen from "../../../screens/Register_LogIn/Initial_Screen/InitialScreen";
import Recovery from "../../../screens/Register_LogIn/Recovery";
import SignInScreen from "../../../screens/Register_LogIn/Sign_in/SingIn";
import SignUpScreen from "../../../screens/Register_LogIn/Sign_up/SignUp";
import { AvatarChoose } from "../../../screens/Register_LogIn/Sign_up/Sign_up_screens/AvatarChoose";
import { NameModal } from "../../../screens/Register_LogIn/Sign_up/Sign_up_screens/NameModal";
import { Username } from "../../../screens/Register_LogIn/Sign_up/Sign_up_screens/Username";

const Stack = createNativeStackNavigator();

export const LoginAndRegister = (props) => {
  const { colors } = useTheme();
  const navigation = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navigation}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen component={InitialScreen} name="InitialScreen" />
        <Stack.Group>
          <Stack.Screen component={SignInScreen} name="SignInScreen" />
          <Stack.Screen component={Recovery} name="DataRecovery" />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen component={SignUpScreen} name="SignUpScreen" />
          <Stack.Screen component={NameModal} name="NameInfo" />
          <Stack.Screen component={AvatarChoose} name="Avatar" />
          <Stack.Screen component={Username} name="Username" />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};