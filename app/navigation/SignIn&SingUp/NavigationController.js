import {
  NavigationContainer,
  StackActions,
  useNavigationContainerRef,
  useTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState, useReducer } from "react";
import { ActivityIndicator } from "react-native";
import { auth } from "../../../firebase";
import { AuthReducer, initialState } from "../../redux/AuthReducer";
import { App_Navigation } from "./AppNavigation";
import { Loader } from "./components/Loader";
import { LoginAndRegister } from "./SignIn_SignUp_nav";
export const NavigationController = (props) => {
  const { colors } = useTheme();
  const [isSignedIn, setIsSigned] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigationContainerRef();
  const Stack = createNativeStackNavigator();
  const user = auth.currentUser;
  const [authReducer, dispatch] = useReducer(AuthReducer, initialState);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsSigned(true);
    } else {
      setIsSigned(false);
    }
  });
  useEffect(() => {
    console.log(authReducer.isLoading);
  }, [authReducer]);
  if (authReducer.isLoading) {
    return <Loader />;
  }
  return isSignedIn ? <App_Navigation /> : <LoginAndRegister />;
};
