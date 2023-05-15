import { useEffect, useState } from "react";
import * as Location from "expo-location";

interface UserLocation {
  coords: {
    latitude: number;
    longitude: number;
  };
  city: string | undefined;
}

const useUserLocation = (): [UserLocation, boolean] => {
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
        console.log(address);
        const city = address.length > 0 ? address[0].city : undefined;

        setLocation((prevLocation) => ({ ...prevLocation, city }));
        setIsLoading(false);
      } catch (error) {
        console.error("Error retrieving user location:", error);
        setIsLoading(false);
      }
    })();
  }, []);

  return [location, isLoading];
};

export default useUserLocation;
