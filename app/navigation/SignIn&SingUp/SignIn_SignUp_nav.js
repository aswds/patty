import {
  NavigationContainer,
  useNavigationContainerRef,
  useTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SignInScreen from "../../screens/Register_LogIn/Sign_in/SingIn";
import SignUpScreen from "../../screens/Register_LogIn/Sign_up/SignUp";
// import CameraScreen from "../screens/Profile/EditProfile/camera";
const Stack = createNativeStackNavigator();

export const LoginAndRegister = (props) => {
  const { colors } = useTheme();
  const navigation = useNavigationContainerRef();
  const password_screen_options = {
    headerShown: true,
    headerTitle: "Check this carefully 🧐",
    headerTintColor: "white",
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: colors.primary,
    },
  };
  return (
    <NavigationContainer ref={navigation}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen component={SignInScreen} name="SignInScreen" />
        {/* <Stack.Screen component={DataRecovery} name="DataRecovery" /> */}
        <Stack.Group>
          <Stack.Screen component={SignUpScreen} name="RegisterScreen" />
          {/* <Stack.Screen component={NameModal} name="NameInfo" /> */}
          {/* <Stack.Screen component={AvatarChoose} name="Avatar" /> */}
          {/* <Stack.Screen component={CameraScreen} name="CameraStack" /> */}
          {/* <Stack.Screen
            component={PasswordRules}
            name="PasswordRules"
            options={password_screen_options}
          /> */}
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
