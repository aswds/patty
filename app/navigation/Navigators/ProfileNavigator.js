import {
  NavigationContainer,
  useNavigationContainerRef,
  useTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Dimensions } from "react-native";
import EditProfile from "../../screens/Profile/EditProfile/EditProfile";
import Profile from "../../screens/Profile/Profile";
const Stack = createNativeStackNavigator();

export const ProfileNavigator = (props) => {
  const { colors } = useTheme();
  const navigation = useNavigationContainerRef();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Profile} name="Profile" />
      <Stack.Group
        screenOptions={{
          presentation: "modal",
          contentStyle: {
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          },
        }}
      >
        <Stack.Screen component={EditProfile} name="EditProfile" />
      </Stack.Group>
    </Stack.Navigator>
  );
};
