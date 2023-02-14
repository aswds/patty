import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Tabs } from "../../custom/navigation/tabs";
import DirectMessage from "../../screens/Chat/components/DirectMessage/DirectMessage";
import PartyCreationScreen from "../../screens/Map/PartyCreationScreen/PartyCreationScreen";
import AddCreatorsScreen from "../../screens/Map/AddCreators/AddCreatorsScreen";
import ChooseLocation from "../../screens/Map/ChooseLocation/ChooseLocation";
import PartyMarker from "../../screens/Map/PartyMarker/PartyMarker";

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
      <Stack.Screen component={Tabs} name="Tabs" />
      <Stack.Group>
        <Stack.Screen
          component={DirectMessage}
          name={"DirectMessage"}
          options={({ route }) => ({})}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          component={PartyCreationScreen}
          name="PartyCreationScreen"
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen component={AddCreatorsScreen} name="AddCreators" />
        <Stack.Screen component={ChooseLocation} name="ChooseLocation" />
        <Stack.Screen component={PartyMarker} name={"PartyMarker"} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
