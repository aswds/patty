import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import React from "react";
import { Provider } from "react-redux";
import store from "../../redux/store/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigator } from "./AppNavigator";

/**
 * Providing redux store for app
 * */

export const App_Navigation = () => {
  const navigation = useNavigationContainerRef();
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigation}>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
