import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Map from "../../screens/Map/Map";
import { MapStackNavigatorParamList } from "../../Types/MapStack/NavigationTypes";
import { PartyCreationStack } from "./PartyCreationStack";

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
      {/*<Stack.Screen component={AddCreatorsScreen} name="AddCreators" />*/}
    </Stack.Navigator>
  );
};
