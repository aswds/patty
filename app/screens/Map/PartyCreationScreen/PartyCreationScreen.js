import {
  useNavigation,
  usePreventRemoveContext,
  useRoute,
} from "@react-navigation/native";
import React, { useState } from "react";

import PickTime from "../PickTime/PickTime";
import CreatePartyButton from "./components/CreatePartyButton";
import Creators from "./components/Creators";
import Location from "./components/Location";
import CustomButton from "./components/LocationAddButton";
import PickTitle from "./components/PickTitle";
import Screen from "./components/Screen";
import TagList from "./components/TagList";
import { Alert } from "react-native";
import { BackButton } from "../../Register_LogIn/components/BackButton";
export default function PartyCreationScreen(props) {
  const prevent = usePreventRemoveContext();
  const route = useRoute();
  const navigation = useNavigation();
  const { userLocation } = route.params;
  const [tags, setTags] = useState([]);
  const [location, setLocation] = useState({});
  const [time, setTime] = useState();
  const [title, setTitle] = React.useState();
  let data = {
    title: title,
    tags: tags,
    location: location,
    time: time,
  };
  const hasUnsavedChanges = Boolean(title, tags, location, time);

  React.useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();
        // Prompt the user before leaving the screen
        Alert.alert(
          "Discard changes?",
          "You have unsaved changes. Are you sure to discard them and leave the screen?",
          [
            { text: "Don't leave", style: "cancel", onPress: () => {} },
            {
              text: "Discard",
              style: "destructive",
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
            },
          ]
        );
      }),
    [navigation, hasUnsavedChanges]
  );
  return (
    <Screen>
      <BackButton navigation={navigation} />
      <Creators />
      <PickTitle setTitle={setTitle} />
      <TagList setTags={setTags} tags={tags} />
      {console.log(hasUnsavedChanges)}
      <Location
        setLocation={setLocation}
        userLocation={userLocation}
        locationInfo={{
          addressInfo: route.params?.address,
          region: route.params?.region,
        }}
        locationAddButton={
          <CustomButton
            onPress={() =>
              navigation.navigate("ChooseLocation", {
                userLocation: userLocation,
              })
            }
            title="Choose a location"
          />
        }
      />
      <PickTime setTime={setTime} />
      <CreatePartyButton data={data} />
    </Screen>
  );
}
