import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import EditProfile from "../../screens/Profile/EditProfile/EditProfile";
import Profile from "../../screens/Profile/Profile";
import { isAndroid } from "../../src/platform";
import { ProfileNavigatorParamList } from "../../Types/ProfileStack/NavigationTypes";
import ChangeEmail from "../../screens/VerifyEmail/ChangeEmail";
import ChangeBio from "../../screens/ChangeBio/ChangeBio";
import NavigationBar from "../../screens/Map/PartyCreationScreens/NavigationBar";
import { SafeAreaView } from "react-native";
import { colors } from "../../src/colors";

const Stack = createNativeStackNavigator<ProfileNavigatorParamList>();

export const ProfileNavigator = () => {
  const radius = isAndroid ? 0 : 50;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Profile} name="Profile" />
      <Stack.Group
        screenOptions={
          {
            // contentStyle: {
            //   borderTopLeftRadius: radius,
            //   borderTopRightRadius: radius,
            // },
          }
        }
      >
        <Stack.Screen component={EditProfile} name="EditProfile" />
        <Stack.Screen component={ChangeEmail} name="ChangeEmail" />
        <Stack.Screen component={ChangeBio} name="ChangeBio" />
      </Stack.Group>
    </Stack.Navigator>
  );
};
