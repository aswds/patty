import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { isAndroid } from "../../src/platform";
import ChangeEmail from "../../screens/VerifyEmail/ChangeEmail";
import { NavigationContainer } from "@react-navigation/native";
import VerifyEmail from "../../screens/VerifyEmail/VerifyEmail";
import { Provider } from "react-redux";
import store from "../../redux/store/store";

const Stack = createNativeStackNavigator();
export const VerifyEmailNav = (props) => {
  const radius = isAndroid ? 0 : 50;
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen component={VerifyEmail} name={"VerifyEmail"} />
          <Stack.Screen component={ChangeEmail} name="ChangeEmail" />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};
