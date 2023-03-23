import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ChooseLocation from "../../screens/Map/PartyCreationScreens/ChooseLocation/ChooseLocation";
import { PartyCreationNavigatorParamList } from "../../Types/MapStack/NavigationTypes";
import GeneralInformation from "../../screens/Map/PartyCreationScreens/GeneralInformation";
import LocationAndTime from "../../screens/Map/PartyCreationScreens/LocationAndTime";

const Stack = createNativeStackNavigator<PartyCreationNavigatorParamList>();
export const PartyCreationStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={LocationAndTime} name="LocationAndTime" />
      <Stack.Screen component={ChooseLocation} name="ChooseLocation" />
      <Stack.Screen
        component={GeneralInformation}
        name={"GeneralInformation"}
      />
    </Stack.Navigator>
  );
};
