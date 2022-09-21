import {
    NavigationContainer,
    useNavigationContainerRef,
    useTheme,
  } from "@react-navigation/native";
  import { createNativeStackNavigator } from "@react-navigation/native-stack";
  import React, { useState } from "react";
  export const LoginAndRegister = (props) => {
    const { colors } = useTheme();
    const [isSignedIn, setIsSigned] = useState(true)
    const navigation = useNavigationContainerRef();
    return (
      <NavigationContainer ref={navigation}>
        {isSignedIn?
        }
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen component={LoginScreen} name="LoginScreen" />
          {/* <Stack.Screen component={DataRecovery} name="DataRecovery" /> */}
          <Stack.Group>
            <Stack.Screen component={RegisterScreen} name="RegisterScreen" />
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
  