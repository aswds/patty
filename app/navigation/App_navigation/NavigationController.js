import {
  NavigationContainer,
  StackActions,
  useNavigationContainerRef,
  useTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState, useReducer, useContext } from "react";
import { ActivityIndicator } from "react-native";
import { auth } from "../../../firebase";
import { AuthReducer, initialState } from "../../redux/AuthReducer";
import { App_Navigation } from "./AppNavigation";
import {
  AuthContext,
  AuthContextProvider,
} from "../SignIn&SingUp/components/AuthContext";
import { Loader } from "../SignIn&SingUp/components/Loader";
import { LoginAndRegister } from "../SignIn&SingUp/SignIn_SignUp_nav";
export const NavigationController = (props) => {
  const { colors } = useTheme();
  const [isSignedIn, setIsSigned] = useState(true);
  const navigation = useNavigationContainerRef();
  const Stack = createNativeStackNavigator();
  const user = auth.currentUser;
  const { isLoading } = useContext(AuthContext);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsSigned(true);
    } else {
      setIsSigned(false);
    }
  });
  if (isLoading) {
    return <Loader />;
  }

  return <>{isSignedIn ? <App_Navigation /> : <LoginAndRegister />}</>;
};
