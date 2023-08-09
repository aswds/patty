import { useEffect, useState } from "react";
import Screen from "../../../shared/Screen/Screen_MappingChildren";
import Location from "./components/Location";
import CustomButton from "./components/LocationAddButton";

import { ILocation, PartyPlace } from "../../../Types/Events";
import { PartyCreationStackScreenProps } from "../../../Types/MapStack/ScreenNavigationProps";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import CustomAlert from "../../../shared/Alert/CustomAlert";
import NextButton from "../../../shared/Buttons/NextButton";
import { AlertConfig } from "../helpers/pickAnAlertType";
import NavigationBar from "./NavigationBar";
import PickTime from "./PickTime/PickTime";
import PartyPlaces from "./Place/PartyPlace";

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
  const userLocation = useTypedSelector(
    (state) => state.user_state.current_user.userLocation
  );

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
        userLocation={userLocation?.coords}
        locationAddButton={
          <CustomButton
            style={{ width: "100%" }}
            onPress={() => {
              if (userLocation?.city) {
                navigation.navigate("ChooseLocation", {
                  userLocation: userLocation.coords,
                  city: userLocation.city,
                });
              }
            }}
            title="Select a location"
          />
        }
      />
      <PartyPlaces handlePartyPlaceUpdate={handlePartyPlaceUpdate} />
      <PickTime setTime={setTime} />
      <CustomAlert
        errorMsg={error.message}
        title={error.title}
        hideModal={() => setShowAlertModal(false)}
        showModal={showAlertModal}
      />
      <NextButton
        onPress={onPress}
        isValueEntered={Boolean(location.region && time)}
        error={error}
        handleErrorMessage={handleErrorMessage}
      />
    </Screen>
  );
};

export default LocationAndTime;
