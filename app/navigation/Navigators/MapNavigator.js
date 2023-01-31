import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AddCreatorsScreen from "../../screens/Map/AddCreators/AddCreatorsScreen";
import ChooseLocation from "../../screens/Map/ChooseLocation/ChooseLocation";
import Map from "../../screens/Map/Map";
import PartyCreationScreen from "../../screens/Map/PartyCreationScreen/PartyCreationScreen";

const Stack = createNativeStackNavigator();
export const MapNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Map} name="Map" />

      <Stack.Group
        screenOptions={{
          presentation: "fullScreenModal",
          orientation: "portrait",
        }}
      >
        <Stack.Screen
          component={PartyCreationScreen}
          name="PartyCreationScreen"
        />
        <Stack.Screen component={AddCreatorsScreen} name="AddCreators" />
        <Stack.Screen component={ChooseLocation} name="ChooseLocation" />
      </Stack.Group>
      {/*<Stack.Group*/}
      {/*  screenOptions={{*/}
      {/*    presentation: "modal",*/}
      {/*    orientation: "portrait",*/}
      {/*    contentStyle: {*/}
      {/*      borderTopLeftRadius: radius,*/}
      {/*      borderTopRightRadius: radius,*/}
      {/*    },*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Stack.Screen component={ChooseLocation} name="ChooseLocation" />*/}
      {/*</Stack.Group>*/}
    </Stack.Navigator>
  );
};
