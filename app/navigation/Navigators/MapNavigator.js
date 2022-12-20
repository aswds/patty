import {
  NavigationContainer,
  useNavigationContainerRef,
  useTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Map from "../../screens/Map/Map";
import PartyCreationScreen from "../../screens/Map/PartyCreationScreen/PartyCreationScreen";
const Stack = createNativeStackNavigator();

export const MapNavigator = (props) => {
  const navigation = useNavigationContainerRef();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Map} name="Map" />
      <Stack.Group
        screenOptions={{
          presentation: "modal",
          contentStyle: {
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          },
        }}
      >
        <Stack.Screen
          component={PartyCreationScreen}
          name="PartyCreationScreen"
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
