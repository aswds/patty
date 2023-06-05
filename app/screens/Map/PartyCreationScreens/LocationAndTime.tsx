import React, { useEffect, useState } from "react";
import Screen from "../../../shared/Screen/Screen_MappingChildren";
import Location from "./components/Location";
import CustomButton from "./components/LocationAddButton";

import NavigationBar from "./NavigationBar";
import { PartyPlace, ILocation } from "../../../Types/Events";
import PickTime from "./PickTime/PickTime";
import PartyPlaces from "./Place/PartyPlace";
import { PartyCreationStackScreenProps } from "../../../Types/MapStack/ScreenNavigationProps";
import NextButton from "../../../shared/Buttons/NextButton";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { AlertConfig } from "../helpers/pickAnAlertType";
import CustomAlert from "../../../shared/Alert/CustomAlert";
import { useUserLocation } from "../../../hooks/useUserLocation/useUserLocation";

const LocationAndTime = ({
  route,
  navigation,
}: PartyCreationStackScreenProps<"LocationAndTime">) => {
  const { fullAddressInfo, region } = route.params;

  const { createEventsLocationAndTimeUpdate } = useActions();
  const [time, setTime] = useState<Date>(new Date());
  const [partyPlace, setPartyPlace] = useState<PartyPlace>("House");
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [error, setError] = useState<AlertConfig>({
    title: "",
    message: "",
  });

  const [location, setLocation] = useState<ILocation>({
    fullAddressInfo: null,
    address: null,
    region: null,
  });
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
  const [userLocation] = useUserLocation();
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

  const handleErrorMessage = (titleToSet: string, message: string) => {
    if (titleToSet.length < 1) {
      setError({
        title: "Please enter a location",
        message:
          "Oops! It looks like the location for the party hasn't been specified yet.",
      });
    }
    setShowAlertModal(true);
  };

  return (
    <Screen>
      <NavigationBar navigation={navigation} text={"Location and time"} />
      <Location
        userLocation={userLocation.coords}
        locationAddButton={
          <CustomButton
            style={{ width: "100%" }}
            onPress={() =>
              navigation.navigate("ChooseLocation", {
                userLocation: userLocation.coords,
                city: userLocation.city,
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
        error={error}
        handleErrorMessage={handleErrorMessage}
      />
      <CustomAlert
        errorMsg={error.message}
        title={error.title}
        hideModal={() => setShowAlertModal(false)}
        showModal={showAlertModal}
      />
    </Screen>
  );
};

export default LocationAndTime;
