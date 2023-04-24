import React, { useEffect, useState } from "react";
import Screen from "../../../shared/Screen/Screen_MappingChildren";
import Location from "./components/Location";
import CustomButton from "./components/LocationAddButton";
import useUserLocation from "../../../hooks/useUserLocation/useUserLocation";
import NavigationBar from "./NavigationBar";
import { PartyPlace, ILocation } from "../../../Types/Events";
import PickTime from "./PickTime/PickTime";
import PartyPlaces from "./Place/PartyPlace";
import { PartyCreationStackScreenProps } from "../../../Types/MapStack/ScreenNavigationProps";
import NextButton from "../../../shared/Buttons/NextButton";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const LocationAndTime = ({
  route,
  navigation,
}: PartyCreationStackScreenProps<"LocationAndTime">) => {
  const { fullAddressInfo, region } = route.params;

  const { createEventsLocationAndTimeUpdate } = useActions();
  const [time, setTime] = useState<Date>(new Date());
  const [partyPlace, setPartyPlace] = useState<PartyPlace>("House");
  const [location, setLocation] = useState<ILocation>({});
  // handlers

  function handlePartyPlaceUpdate(place: PartyPlace) {
    setPartyPlace(place);
  }

  useEffect(() => {
    setLocation({
      fullAddressInfo,
      region,
    });
  }, [route.params.region]);
  const { userLocation, city } = useUserLocation();

  const onPress = () => {
    if (location && time) {
      createEventsLocationAndTimeUpdate({
        location,
        partyPlace,
        time: time.toISOString(),
      });
      navigation.navigate("AdditionalInformation");
    }
  };

  return (
    <Screen>
      <NavigationBar navigation={navigation} text={"Location and time"} />
      <Location
        userLocation={userLocation}
        locationAddButton={
          <CustomButton
            style={{ width: "100%" }}
            onPress={() =>
              navigation.navigate("ChooseLocation", {
                userLocation: userLocation,
                city: city,
              })
            }
            title="Select a location"
          />
        }
      />
      <PartyPlaces handlePartyPlaceUpdate={handlePartyPlaceUpdate} />
      <PickTime setTime={setTime} />
      <NextButton
        onPress={onPress}
        isValueEntered={Boolean(location.region && time)}
      />
    </Screen>
  );
};

export default LocationAndTime;
