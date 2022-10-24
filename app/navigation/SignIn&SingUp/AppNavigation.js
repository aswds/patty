import {
  NavigationContainer,
  useNavigationContainerRef,
  useTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Tabs } from "../../custom/navigation/tabs";
import Home from "../../screens/Home/Home";
const Stack = createNativeStackNavigator();

export const App_Navigation = (props) => {
  const { colors } = useTheme();
  const navigation = useNavigationContainerRef();
  return (
    <NavigationContainer ref={navigation}>
      <Tabs />
    </NavigationContainer>
  );
};
