import {
  NavigationContainer,
  useNavigationContainerRef,
  useTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Provider } from "react-redux";
import { Tabs } from "../../custom/navigation/tabs";
import store from "../../redux/store/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
const Stack = createNativeStackNavigator();

export const App_Navigation = (props) => {
  const navigation = useNavigationContainerRef();
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigation}>
        <Provider store={store}>
          <Tabs />
        </Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
