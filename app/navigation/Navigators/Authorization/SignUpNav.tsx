import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SignUpScreen from "../../../screens/Authorization/Sign_up/SignUp";
import { AvatarChoose } from "../../../screens/Authorization/Sign_up/Sign_up_screens/AvatarChoose";
import { NameModal } from "../../../screens/Authorization/Sign_up/Sign_up_screens/NameModal";
import { Username } from "../../../screens/Authorization/Sign_up/Sign_up_screens/Username";
import { SignUpNavigatorParamList } from "../../../Types/Authorization/SignUp/NavigationTypes";

const Stack = createNativeStackNavigator<SignUpNavigatorParamList>();

const SignUpNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={SignUpScreen} name="SignUpScreen" />
      <Stack.Screen component={NameModal} name="NameInfo" />
      <Stack.Screen component={Username} name="Username" />
      <Stack.Screen component={AvatarChoose} name="Avatar" />
    </Stack.Navigator>
  );
};

export default SignUpNav;
