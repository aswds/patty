import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import EditProfile from "../../screens/Profile/EditProfile/EditProfile";
import Profile from "../../screens/Profile/Profile";
import { isAndroid } from "../../src/platform";
import { ProfileNavigatorParamList } from "../../Types/ProfileStack/NavigationTypes";
import ChangeEmail from "../../screens/VerifyEmail/ChangeEmail";
import ChangeBio from "../../screens/Profile/EditProfile/ChangeBio/ChangeBio";
import NavigationBar from "../../screens/Map/PartyCreationScreens/NavigationBar";
import { SafeAreaView } from "react-native";
import { colors } from "../../src/colors";
import ChangeUsername from "../../screens/Profile/EditProfile/ChangeUsername/ChangeUsername";

const Stack = createNativeStackNavigator<ProfileNavigatorParamList>();

export const ProfileNavigator = () => {
  const radius = isAndroid ? 0 : 50;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Profile} name="Profile" />

      <Stack.Screen component={EditProfile} name="EditProfile" />
      <Stack.Group
        screenOptions={{
          animation: "slide_from_bottom",
        }}
      >
        <Stack.Screen component={ChangeEmail} name="ChangeEmail" />
        <Stack.Screen component={ChangeBio} name="ChangeBio" />
        <Stack.Screen component={ChangeUsername} name="ChangeUsername" />
      </Stack.Group>
    </Stack.Navigator>
  );
};
