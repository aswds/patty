import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Chat from "../../screens/Chat/Chat";
import { ChatNavigator } from "../Navigators/ChatNavigator";
import { MapNavigator } from "../Navigators/MapNavigator";

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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={MapNavigator} name={"MapNavigator"} />
      <Stack.Screen component={ChatNavigator} name={"Chat"} />
    </Stack.Navigator>
  );
};
