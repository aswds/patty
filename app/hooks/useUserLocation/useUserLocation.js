import React, { useEffect, useState } from "react";
import { getUserLocation } from "../../shared/GetLocationFunctions/getUserLocation";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Alert } from "react-native";
import { getAddress } from "../../shared/GetLocationFunctions/getAddress";

/**
 * Get all parties in user's city
 * @param userLocation
 * @returns {Promise<Array<QueryDocumentSnapshot<DocumentData>>|void>}
 */
async function fetchCityParties(userLocation) {
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

/**
 *  Hook to get user location and fetch city parties
 * @returns {{isLoading: boolean, parties: undefined, userLocation: unknown, errorMsg: unknown}}
 */

export default function useUserLocation() {
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [parties, setParties] = useState();
  useEffect(() => {
    (async function fetchData() {
      try {
        getUserLocation().then((res) => {
          getAddress(res.latitude, res.longitude).then((r) => {
            fetchCityParties(r?.City).then((parties) => {
              setParties(parties.map((doc) => doc.data()));
            });
          });
          setUserLocation({
            latitude: res.latitude,
            latitudeDelta: 0,
            longitude: res.longitude,
            longitudeDelta: -0.01,
          });
          setIsLoading(false);
        });
      } catch (e) {
        setErrorMsg(e);
      }
    })();
  }, []);

  return { userLocation, parties, errorMsg, isLoading };
}
