import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Map from "../../screens/Map/Map";
import { MapStackNavigatorParamList } from "../../Types/MapStack/NavigationTypes";
import { PartyCreationStack } from "./PartyCreationStack";
import Guests from "../../screens/Modals/PartyModal/screen/Guests";
import JoinedEvents from "../../screens/Map/JoinedEvents/JoinedEvents";
import PartyScreen from "../../screens/Party/PartyScreen";

const Stack = createNativeStackNavigator<MapStackNavigatorParamList>();
export const MapNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Map} name="Map" />
      <Stack.Screen
        component={PartyCreationStack}
        name="PartyCreationStack"
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen component={Guests} name={"Guests"} options={{}} />
      <Stack.Screen
        component={JoinedEvents}
        name={"JoinedEvents"}
        options={{ animation: "slide_from_bottom" }}
      />
      <Stack.Screen component={PartyScreen} name="Party" />
      {/*<Stack.Screen component={AddCreatorsScreen} name="AddCreators" />*/}
    </Stack.Navigator>
  );
};
