import { getUserLocation } from "../../shared/GetLocationFunctions/getUserLocation";
import { LocationObject } from "expo-location";
import { getAddress } from "../../shared/GetLocationFunctions/getAddress";
import { IFullAddress } from "../../Types/Events";
import { fetchCityParties } from "../../hooks/useUserLocation/useUserLocation";

export const getUserLocationAndEvents = (setState: any) => {
  const { setEvents, setUserLocation, setIsLoading, setErrorMsg } = setState;
  try {
    getUserLocation().then((res: LocationObject) => {
      setUserLocation({
        latitude: res.coords.latitude,
        latitudeDelta: 0,
        longitude: res.coords.longitude,
        longitudeDelta: -0.01,
      });
      getAddress(res.coords.latitude, res.coords.longitude).then(
        (r: IFullAddress) => {
          fetchCityParties(r?.City).then((events) => {
            setEvents(events);
          });
        }
      );

      setIsLoading(false);
    });
  } catch (e: any) {
    setErrorMsg(e);
  }
};
