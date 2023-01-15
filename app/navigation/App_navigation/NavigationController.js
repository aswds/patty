import { useNavigationContainerRef, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useContext, useState } from "react";
import { auth } from "../../../firebase";
import { AuthContext } from "../SignIn&SingUp/components/AuthContext";
import { Loader } from "../SignIn&SingUp/components/Loader";
import { LoginAndRegister } from "../SignIn&SingUp/SignIn_SignUp_nav";
import { App_Navigation } from "./AppNavigation";

export const NavigationController = (props) => {
  const { colors } = useTheme();
  const [isSignedIn, setIsSigned] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigationContainerRef();
  const Stack = createNativeStackNavigator();
  onAuthStateChanged(auth, (user) => {
    setIsLoading(false);
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
