import {
  NavigationContainer,
  useNavigationContainerRef,
  useTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AddCreatorsScreen from "../../screens/Map/AddCreators/AddCreatorsScreen";
import ChooseLocation from "../../screens/Map/ChooseLocation/ChooseLocation";
import Map from "../../screens/Map/Map";
import PartyCreationScreen from "../../screens/Map/PartyCreationScreen/PartyCreationScreen";
import { isAndroid } from "../../src/platform";
const Stack = createNativeStackNavigator();
export const MapNavigator = (props) => {
  const navigation = useNavigationContainerRef();
  const radius = isAndroid ? 0 : 50;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Map} name="Map" />

      <Stack.Group
        screenOptions={{
          presentation: "modal",
          contentStyle: {
            borderTopLeftRadius: radius,
            borderTopRightRadius: radius,
          },
        }}
      >
        <Stack.Screen
          component={PartyCreationScreen}
          name="PartyCreationScreen"
        />
        <Stack.Screen component={ChooseLocation} name="ChooseLocation" />
        <Stack.Screen component={AddCreatorsScreen} name="AddCreators" />
      </Stack.Group>
    </Stack.Navigator>
  );
};
