import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import InitialScreen from "../../../screens/Authorization/Initial_Screen/InitialScreen";
import SignUpNav from "./SignUpNav";
import SignInNav from "./SignInNav";
import { AuthorizationParamList } from "../../../Types/Authorization/Auth/NavigationTypes";
import { FontFamily } from "../../../../assets/fonts/Fonts";
import PrivacyPolicy from "../../../screens/Authorization/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "../../../screens/Authorization/Terms/TermsOfService";
import { colors } from "../../../src/colors";

const Stack = createNativeStackNavigator<AuthorizationParamList>();

export const Authorization = () => {
  const navigation = useNavigationContainerRef();
  const Terms_Service_headerOptions = {
    headerShown: true,
    headerBackTitle: "",
    headerTitleStyle: {
      fontFamily: FontFamily.extra_bold,
      fontSize: 25,
      color: colors.text,
    },
    headerStyle: {
      backgroundColor: colors.modalBackground,
    },
    headerTintColor: colors.accentColor,
  };
  return (
    <NavigationContainer ref={navigation}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="InitialScreen" component={InitialScreen} />

        <Stack.Screen name={"SignInNav"} component={SignInNav} />
        <Stack.Screen name={"SignUpNav"} component={SignUpNav} />
        <Stack.Group>
          <Stack.Screen
            name="TermsOfService"
            component={TermsOfService}
            options={{
              ...Terms_Service_headerOptions,
              title: "Terms of Service",
            }}
          />
          <Stack.Screen
            component={PrivacyPolicy}
            name="PrivacyPolicy"
            options={{
              ...Terms_Service_headerOptions,
              title: "Privacy Policy",
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
