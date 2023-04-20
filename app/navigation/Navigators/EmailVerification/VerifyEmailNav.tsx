import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ChangeEmail from "../../../screens/VerifyEmail/ChangeEmail";
import { NavigationContainer } from "@react-navigation/native";
import VerifyEmail from "../../../screens/VerifyEmail/VerifyEmail";
import { Provider } from "react-redux";
import store from "../../../redux/store/store";
import { VerificationParamList } from "../../../Types/Authorization/Verification/NavigationTypes";

const VerifyStack = createNativeStackNavigator<VerificationParamList>();
export const VerifyEmailNav = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <VerifyStack.Navigator screenOptions={{ headerShown: false }}>
          <VerifyStack.Screen component={VerifyEmail} name={"VerifyEmail"} />
          <VerifyStack.Screen component={ChangeEmail} name="ChangeEmail" />
        </VerifyStack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};
