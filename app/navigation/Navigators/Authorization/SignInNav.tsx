import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignInNavigatorParamList } from "../../../Types/Authorization/SignIn/NavigationTypes";
import SignInScreen from "../../../screens/Authorization/Sign_in/SingIn";
import Recovery from "../../../screens/Authorization/Recovery";

const Stack = createNativeStackNavigator<SignInNavigatorParamList>();

const SignInNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"SignInScreen"} component={SignInScreen} />
      <Stack.Screen name={"Recovery"} component={Recovery} />
    </Stack.Navigator>
  );
};

export default SignInNav;
