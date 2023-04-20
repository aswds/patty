import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import InitialScreen from "../../../screens/Authorization/Initial_Screen/InitialScreen";
import SignUpNav from "./SignUpNav";
import SignInNav from "./SignInNav";
import { AuthorizationParamList } from "../../../Types/Authorization/Auth/NavigationTypes";

const Stack = createNativeStackNavigator<AuthorizationParamList>();

export const Authorization = () => {
  const navigation = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navigation}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="InitialScreen" component={InitialScreen} />
        <Stack.Screen name={"SignInNav"} component={SignInNav} />
        <Stack.Screen name={"SignUpNav"} component={SignUpNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
