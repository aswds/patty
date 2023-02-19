import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Alert } from "react-native";
import { partiesLoading, partiesReceived } from "../reducers/Parties";
import { getUserLocation } from "../../shared/GetLocationFunctions/getUserLocation";
import { getAddress } from "../../shared/GetLocationFunctions/getAddress";

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
export function fetch_parties() {
  return async (dispatch) => {
    dispatch(partiesLoading());
    try {
      getUserLocation().then((res) => {
        getAddress(res.latitude, res.longitude).then((r) => {
          fetchCityParties(r?.City).then((parties) => {
            dispatch(partiesReceived(parties.map((doc) => doc.data())));
          });
        });
      });
    } catch (e) {}
  };
}
