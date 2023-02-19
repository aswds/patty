import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import EditProfile from "../../screens/Profile/EditProfile/EditProfile";
import Profile from "../../screens/Profile/Profile";
import { isAndroid } from "../../src/platform";

const Stack = createNativeStackNavigator();

export const ProfileNavigator = (props) => {
  const radius = isAndroid ? 0 : 50;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Profile} name="Profile" />
      <Stack.Group
        screenOptions={{
          presentation: "modal",
          contentStyle: {
            borderTopLeftRadius: radius,
            borderTopRightRadius: radius,
          },
        }}
      >
        <Stack.Screen component={EditProfile} name="EditProfile" />
      </Stack.Group>
    </Stack.Navigator>
  );
};
