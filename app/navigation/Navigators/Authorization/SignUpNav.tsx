import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SignUpScreen from "../../../screens/Authorization/Sign_up/SignUp";
import { AvatarChoose } from "../../../screens/Authorization/Sign_up/Sign_up_screens/AvatarChoose";
import { NameModal } from "../../../screens/Authorization/Sign_up/Sign_up_screens/NameModal";
import { Username } from "../../../screens/Authorization/Sign_up/Sign_up_screens/Username";
import { SignUpNavigatorParamList } from "../../../Types/Authorization/SignUp/NavigationTypes";
import SignUp from "../../../screens/Authorization/Sign_up/SignUP_Phone";

const Stack = createNativeStackNavigator<SignUpNavigatorParamList>();

const SignUpNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={SignUp} name="SignUpScreen" />
      <Stack.Screen component={NameModal} name="NameInfo" />
      <Stack.Screen component={Username} name="Username" />
      <Stack.Screen component={AvatarChoose} name="Avatar" />
    </Stack.Navigator>
  );
};

export default SignUpNav;
