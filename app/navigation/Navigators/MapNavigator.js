import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Map from "../../screens/Map/Map";
import PartyCreationScreen from "../../screens/Map/PartyCreationScreen/PartyCreationScreen";
import AddCreatorsScreen from "../../screens/Map/AddCreators/AddCreatorsScreen";
import ChooseLocation from "../../screens/Map/ChooseLocation/ChooseLocation";

const Stack = createNativeStackNavigator();
export const MapNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Map} name="Map" />

      <Stack.Screen
        component={PartyCreationScreen}
        name="PartyCreationScreen"
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen component={AddCreatorsScreen} name="AddCreators" />
      <Stack.Screen component={ChooseLocation} name="ChooseLocation" />
    </Stack.Navigator>
  );
};
