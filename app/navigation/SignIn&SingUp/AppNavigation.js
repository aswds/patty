import {
  NavigationContainer,
  useNavigationContainerRef,
  useTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../../screens/Home/Home";
const Stack = createNativeStackNavigator();

export const App_Navigation = (props) => {
  const { colors } = useTheme();
  const navigation = useNavigationContainerRef();
  return (
    <NavigationContainer ref={navigation}>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen component={Home} name="Home" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
