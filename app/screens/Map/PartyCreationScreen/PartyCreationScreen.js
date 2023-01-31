import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";

import PickTime from "../PickTime/PickTime";
import CreatePartyButton from "./components/CreatePartyButton";
import Creators from "./components/Creators";
import Location from "./components/Location";
import CustomButton from "./components/LocationAddButton";
import PickTitle from "./components/PickTitle";
import Screen from "./components/Screen";
import TagList from "./components/TagList";
import { BackButton } from "../../Register_LogIn/components/BackButton";
import Access from "./components/Access";

export default function PartyCreationScreen(props) {
  const route = useRoute();
  const { region, address, fullAddressInfo } = route.params;
  const navigation = useNavigation();
  const { userLocation } = route.params;
  const [tags, setTags] = useState([]);
  const [location, setLocation] = useState({});
  const [time, setTime] = useState(new Date());
  const [title, setTitle] = useState();
  const [access, setAccess] = useState("public");
  let data = {
    title: title,
    tags: tags,
    location: { region, address, fullAddressInfo },
    time: time,
    access: access,
  };
  // const hasUnsavedChanges = Boolean(title, tags, location, time);

  return (
    <Screen>
      <BackButton navigation={navigation} style={{ left: 0 }} />
      <Creators />
      <PickTitle setTitle={setTitle} />
      <TagList setTags={setTags} tags={tags} />
      <Access setAccess={setAccess} />
      <Location
        setLocation={setLocation}
        userLocation={userLocation}
        locationInfo={{
          addressInfo: address,
          region: region,
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
