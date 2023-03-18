import React, { useEffect, useState } from "react";
import Screen from "./components/Screen";
import Location from "./components/Location";
import CustomButton from "./components/LocationAddButton";
import CreatePartyButton from "./components/CreatePartyButton";
import { LocationAndTimeScreenNavigationProps } from "../../../Types/MapStack/ScreenNavigationProps";
import useUserLocation from "../../../hooks/useUserLocation/useUserLocation";
import NavigationBar from "./NavigationBar";
import { IEvent } from "../../../Types/Events";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IUser } from "../../../Types/User";
import PickTime from "../PickTime/PickTime";

interface IData extends IEvent {
  user: Pick<IUser, "name" | "surname" | "username" | "image" | "uid">;
}

const LocationAndTime = ({
  route,
  navigation,
}: LocationAndTimeScreenNavigationProps) => {
  const { title, tags, description, fullAddressInfo, region } = route.params;
  const [time, setTime] = useState<Date>(new Date());
  const [access, _] = useState("public");
  const { name, surname, username, image, uid } = useTypedSelector(
    (state) => state.user_state.current_user
  );
  const [data, setData] = useState<IData>({
    title: title!,
    description: description,
    tags: tags,
    location: {
      region,
      fullAddressInfo,
    },
    time: time,
    access: access,
    number_of_guests: 1,
    user: {
      name,
      surname,
      username,
      image,
      uid,
    },
  });

  useEffect(() => {}, []);

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
