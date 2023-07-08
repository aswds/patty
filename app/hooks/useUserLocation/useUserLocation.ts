import * as Location from "expo-location";
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { eventsReference } from "../../Firebase/References";
import { IEvent } from "../../Types/Events";
import { getAddress } from "../../shared/GetLocationFunctions/getAddress";

interface UserLocation {
  coords: {
    latitude: number;
    longitude: number;
  };
  city: string | undefined;
}

export const useUserLocation = (): [UserLocation, boolean, Error | null] => {
  const [location, setLocation] = useState<UserLocation>({
    coords: { latitude: 0, longitude: 0 },
    city: undefined,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const { status } = await Location.getForegroundPermissionsAsync();
        if (status !== "granted") {
          throw new Error("Location permission not granted");
        }

        const { coords } = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = coords;

        setLocation((prevLocation) => ({
          ...prevLocation,
          coords: { latitude, longitude },
        }));

        const address = await getAddress(latitude, longitude);
        const city =
          address?.city ?? "We're having trouble finding your location.😕";
        setLocation({
          city: city!,
          labelToFindParties: address?.labelToFindParties,
        });
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchUserLocation();
  }, []);

  return [location, isLoading, error];
};

/**
 * Get all parties in the user's city
 * @param userLocation
 * @returns {Promise<IEvent[]>}
 */
export async function fetchCityParties(
  userLocation: string
): Promise<IEvent[]> {
  try {
    const collectionRef = eventsReference(userLocation, "Public");
    const querySnapshot = await getDocs(collectionRef);
    if (querySnapshot.docs.length === 0) {
      throw new Error(
        "Sadly, no events were found :( Become the first to create one 👽"
      );
    }
    return querySnapshot.docs.map((e) => e.data() as IEvent);
  } catch (error) {
    throw new Error("Something went wrong 👽");
  }
}
