import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ChatNavigator } from "../Navigators/ChatNavigator";
import { MapNavigator } from "../Navigators/MapStack";
import { ProfileNavigator } from "../Navigators/ProfileNavigator";
import { PartyNavigator } from "../Navigators/PartyStack";
import { AppNavigatorParamList } from "../../Types/AppNavigator/AppNavigator";

const Stack = createNativeStackNavigator<AppNavigatorParamList>();
/**
 * App Navigator
 *
 * -Screens without bottom tabs
 *
 * -StackGroups have to be moved to separate files
 * */
export const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"MapNav"}
    >
      <Stack.Screen component={ProfileNavigator} name={"ProfileNav"} />
      <Stack.Screen component={MapNavigator} name={"MapNav"} />
      {/* <Stack.Screen component={ChatNavigator} name={"ChatNav"} /> */}
      <Stack.Screen component={PartyNavigator} name={"PartyNav"} />
    </Stack.Navigator>
  );
};
