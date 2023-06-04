import * as Location from "expo-location";
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { eventsReference } from "../../Firebase/References";
import { IEvent } from "../../Types/Events";
/**
 * Get all parties in user's city
 * @param userLocation
 * @returns {Promise<IEvent[]>}
 */
export async function fetchCityParties(
  userLocation: string
): Promise<IEvent[]> {
  return new Promise(async (resolve, reject) => {
    const collectionRef = eventsReference(userLocation, "Public");
    await getDocs(collectionRef).then(
      (querySnapshot) => {
        if (querySnapshot.docs.length === 0)
          reject(
            new Error(
              "Sadly, no events we're found :(" +
                "\nBecome the first who gonna create one 👽"
            )
          );
        else resolve(querySnapshot.docs.map((e) => e.data() as IEvent));
      },
      (error) => {
        Alert.alert(error.message);
        reject(Error("Something went wrong 👽"));
      }
    );
  });
}

interface UserLocation {
  coords: {
    latitude: number;
    longitude: number;
  };
  city: string | undefined;
}

export const useUserLocation = (): [UserLocation, boolean] => {
  const [location, setLocation] = useState<UserLocation>({
    coords: { latitude: 0, longitude: 0 },
    city: undefined,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          throw new Error("Location permission not granted");
        }

        const { coords } = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = coords;

        setLocation({ ...location, coords: { latitude, longitude } });

        const address = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        const city = address.length > 0 ? address[0].subregion : undefined;

        setLocation((prevLocation) => ({ ...prevLocation, city: city! }));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    })();
  }, []);

  return [location, isLoading];
};
