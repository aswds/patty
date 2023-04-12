import { UserLocation } from "./../../Types/User";
import { useEffect, useState } from "react";
import { getUserLocation } from "../../shared/GetLocationFunctions/getUserLocation";
import { onSnapshot } from "firebase/firestore";
import { getAddress } from "../../shared/GetLocationFunctions/getAddress";
import { ICoordinates, IEvent, IFullAddress } from "../../Types/Events";
import { LocationObject } from "expo-location";
import { Alert } from "react-native";
import { eventReference } from "../../Firebase/References";
import { useActions } from "../useActions";
import { useAppDispatch } from "../useAppDispatch";
import { updateUserLocation } from "../../redux/reducers/User";

/**
 * Get all parties in user's city
 * @param userLocation
 * @returns {Promise<IEvent[]>}
 */
export async function fetchCityParties(
  userLocation: string
): Promise<IEvent[]> {
  return new Promise((resolve, reject) => {
    const collectionRef = eventReference(userLocation);
    onSnapshot(
      collectionRef,
      async (querySnapshot) => {
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

export default function useUserLocation() {
  // setUserLocation?: Dispatch<SetStateAction<ICoordinates | undefined>>
  const [userLocation, setUserLocation] = useState<ICoordinates>();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [city, setCity] = useState<string>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async function fetchData() {
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
              setCity(r?.city);
              dispatch(
                updateUserLocation({
                  city: r?.city,
                  location: {
                    latitude: res.coords.latitude,
                    latitudeDelta: 0,
                    longitude: res.coords.longitude,
                    longitudeDelta: -0.01,
                  },
                })
              );
            }
          );
        });
      } catch (e: any) {
        setErrorMsg(e);
      }
    })();
  }, []);

  return { userLocation, city, errorMsg };
}
