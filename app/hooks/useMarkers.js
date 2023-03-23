import {
  collectionGroup,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

/**
 *
 * @param userLocation set a user location for fetching parties in city
 */
export function useMarkers(userLocation = "") {
  const [parties, setParties] = useState(); // Set information about created parties
  useEffect(() => {
    (async function fetchData() {
      const db = getFirestore();
      const queryCities = query(
        collectionGroup(db, "UserParties"),
        where("location.fullAddressInfo.City", "==", userLocation)
      );
      await getDocs(queryCities)
        .then((r) => {
          setParties(r.docs);
        })
        .catch((e) => Alert.alert(e));
    })();
  }, []);
  return { parties };
}
