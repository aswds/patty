import {
  NavigationContainer,
  StackActions,
  useNavigationContainerRef,
  useTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../../firebase";
import { App_Navigation } from "./AppNavigation";
import { LoginAndRegister } from "./SignIn_SignUp_nav";
export const NavigationController = (props) => {
  const { colors } = useTheme();
  const [isSignedIn, setIsSigned] = useState(true);
  const navigation = useNavigationContainerRef();
  const Stack = createNativeStackNavigator();
  const user = auth.currentUser;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsSigned(true);
    } else {
      setIsSigned(false);
    }
  });

  return isSignedIn ? <App_Navigation /> : <LoginAndRegister />;
};
