import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Map from "../../screens/Map/Map";
import { MapStackNavigatorParamList } from "../../Types/MapStack/NavigationTypes";
import { PartyCreationStack } from "./PartyCreationStack";
import Guests from "../../screens/Modals/PartyModal/screen/Guests";
import { PartyNavigatorParamList } from "../../Types/PartyStack/NavigationTypes";
import { NavigationContainer } from "@react-navigation/native";
import PartyScreen from "../../screens/Party/PartyScreen";

const Stack = createNativeStackNavigator<PartyNavigatorParamList>();
export const PartyNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={PartyScreen} name="PartyScreen" />
      {/*<Stack.Screen component={AddCreatorsScreen} name="AddCreators" />*/}
    </Stack.Navigator>
  );
};
