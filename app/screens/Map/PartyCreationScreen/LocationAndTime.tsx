import React, { useEffect, useState } from "react";
import Screen from "./components/Screen";
import Location from "./components/Location";
import CustomButton from "./components/LocationAddButton";
import PickTime from "../PickTime/PickTime";
import CreatePartyButton from "./components/CreatePartyButton";
import { LocationAndTimeScreenNavigationProps } from "../../../Types/MapStack/ScreenNavigationProps";
import useUserLocation from "../../../hooks/useUserLocation/useUserLocation";
import NavigationBar from "./NavigationBar";
import { IDoc, ITime } from "../../../Types/Parties";

const LocationAndTime = ({
  route,
  navigation,
}: LocationAndTimeScreenNavigationProps) => {
  const { title, tags, description, fullAddressInfo, region } = route.params;
  const [time, setTime] = useState<Date>(new Date());
  const [access, setAccess] = useState("public");

  const [data, setData] = useState<IDoc>({
    title: title!,
    description: description,
    tags: tags,
    location: {
      region,
      fullAddressInfo,
    },
    time: time as ITime,
    access: access,
    number_of_guests: 1,
  });

  useEffect(() => {
    setData({
      ...data,
      location: { fullAddressInfo, region },
    });
  }, [route.params]);

  const { userLocation } = useUserLocation();

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
