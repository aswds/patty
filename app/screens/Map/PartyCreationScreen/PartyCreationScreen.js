import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

import PickTime from "../PickTime/PickTime";
import CreatePartyButton from "./components/CreatePartyButton";
import Creators from "./components/Creators";
import Location from "./components/Location";
import CustomButton from "./components/LocationAddButton";
import PickTitle from "./components/PickTitle";
import Screen from "./components/Screen";
import TagList from "./components/TagList";
import { BackButton } from "../../../shared/Buttons/BackButton";
import Access from "./components/Access";
import Description from "./components/Desctription";

export default function PartyCreationScreen({ route }) {
  const { region, address, fullAddressInfo } = route.params;
  const navigation = useNavigation();
  const { userLocation, userAddress } = route.params;
  const [tags, setTags] = useState([]);
  const [location, setLocation] = useState({});
  const [description, setDescription] = useState();
  const [time, setTime] = useState(new Date());
  const [title, setTitle] = useState();
  const [access, setAccess] = useState("public");
  let data = {
    title: title,
    description: description,
    tags: tags,
    location: { region, address, fullAddressInfo },
    time: time,
    access: access,
    number_of_guests: 1,
  };

  return (
    <Screen>
      <BackButton navigation={navigation} style={{ left: 0 }} />
      <Creators />
      <PickTitle setTitle={setTitle} title={title} />
      <Description setDescription={setDescription} description={description} />
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
            style={{ width: "100%" }}
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
