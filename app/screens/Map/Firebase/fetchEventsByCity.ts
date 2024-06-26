import { getAddress } from "../../../shared/GetLocationFunctions/getAddress";
import { IEvent, IFullAddress } from "../../../Types/Events";
import { fetchCityParties } from "../../../hooks/useUserLocation/useUserLocation";
import { LocationObject } from "expo-location";

export async function fetchEventsByCity(
  userLocation: LocationObject
): Promise<IEvent[]> {
  return await getAddress(
    userLocation.coords.latitude,
    userLocation.coords.longitude
  ).then(async (r: IFullAddress) => {
    const events = await fetchCityParties(r.city!);
    return events;
  });
}
