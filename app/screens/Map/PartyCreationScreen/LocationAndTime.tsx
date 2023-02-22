import React, { useState } from "react";
import Screen from "./components/Screen";
import Location from "./components/Location";
import CustomButton from "./components/LocationAddButton";
import PickTime from "../PickTime/PickTime";
import CreatePartyButton from "./components/CreatePartyButton";
import { LocationAndTimeScreenNavigationProps } from "../../../Types/MapStack/ScreenNavigationProps";

const LocationAndTime = ({
  route,
  navigation,
}: LocationAndTimeScreenNavigationProps) => {
  const {
    userLocation,
    region,
    address,
    fullAddressInfo,
    title,
    tags,
    description,
  } = route.params;
  const [time, setTime] = useState(new Date());

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
      {/*<Access setAccess={setAccess} />*/}
      <Location
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
};

export default LocationAndTime;
