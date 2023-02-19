import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useLayoutEffect } from "react";
import Chat from "../../screens/Chat/Chat";
import DirectMessage from "../../screens/Chat/components/DirectMessage/DirectMessage";

const Stack = createNativeStackNavigator();

export const ChatNavigator = (props) => {
  useLayoutEffect(() => {
    props.navigation.setOptions({ tabBarVisible: false });
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Chat} name="Chat" />
      <Stack.Screen component={DirectMessage} name={"DirectMessage"} />
    </Stack.Navigator>
  );
};
