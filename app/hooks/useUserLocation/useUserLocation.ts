import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getUserLocation } from "../../shared/GetLocationFunctions/getUserLocation";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Alert } from "react-native";
import { getAddress } from "../../shared/GetLocationFunctions/getAddress";
import firebase from "firebase/compat";
import { ICoordinates, IFullAddress } from "../../Types/Parties";
import { LocationObject } from "expo-location";
import DocumentData = firebase.firestore.DocumentData;

/**
 * Get all parties in user's city
 * @param userLocation
 * @returns {Promise<Array<QueryDocumentSnapshot<DocumentData>>|void>}
 */
async function fetchCityParties(userLocation: string) {
  const db = getFirestore();
  const collectionRef = collection(
    db,
    "PARTIES",
    `${userLocation}`,
    "UserParties"
  );

  return await getDocs(collectionRef)
    .then((r) => {
      return r.docs;
    })
    .catch((e) => Alert.alert(e));
}

export default function useUserLocation(
  setUserLocation: Dispatch<SetStateAction<ICoordinates | undefined>>
) {
  // const [userLocation, setUserLocation] = useState<ICoordinates>();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<DocumentData>();
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
              fetchCityParties(r?.City).then((events) => {
                setEvents(events?.map((event) => event.data()));
              });
            }
          );

          setIsLoading(false);
        });
      } catch (e: any) {
        setErrorMsg(e);
      }
    })();
  }, []);

  return { events, errorMsg, isLoading };
}
