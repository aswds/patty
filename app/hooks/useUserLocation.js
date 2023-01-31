import React, { useEffect, useState } from "react";
import { getUserLocation } from "../screens/Map/components/getUserLocation";
import { getAddress } from "../screens/Map/ChooseLocation/getAddress";
import {
  collectionGroup,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { Alert } from "react-native";

async function fetchCityParties(userLocation) {
  const db = getFirestore();
  const queryCities = query(
    collectionGroup(db, "UserParties"),
    where("location.fullAddressInfo.City", "==", userLocation)
  );
  return await getDocs(queryCities)
    .then((r) => {
      return r.docs;
    })
    .catch((e) => Alert.alert(e));
}
export default function useUserLocation() {
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [parties, setParties] = useState();
  useEffect(() => {
    (async function fetchData() {
      getUserLocation().then((res) => {
        getAddress(res.latitude, res.longitude).then((r) =>
          fetchCityParties(r?.City).then((parties) => {
            setParties(parties.map((doc) => doc.data()));
          })
        );
        setUserLocation({
          latitude: res.latitude,
          latitudeDelta: 0,
          longitude: res.longitude,
          longitudeDelta: -0.01,
        });
        setIsLoading(false);
      });
    })();
  }, []);

  return { userLocation, parties, errorMsg, isLoading };
}
