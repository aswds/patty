import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ChatNavigator } from "../Navigators/ChatNavigator";
import { MapNavigator } from "../Navigators/MapNavigator";
import { ProfileNavigator } from "../Navigators/ProfileNavigator";

const Stack = createNativeStackNavigator();
/**
 * App Navigator
 *
 * -Screens without bottom tabs
 *
 * -StackGroups have to be moved to separate files
 * */
export const AppNavigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"MapNav"}
    >
      <Stack.Screen component={ProfileNavigator} name={"ProfileNav"} />
      <Stack.Screen component={MapNavigator} name={"MapNav"} />
      <Stack.Screen component={ChatNavigator} name={"ChatNav"} />
    </Stack.Navigator>
  );
};
