import {
  collection,
  collectionGroup,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { Alert } from "react-native";
import { getUserLocation } from "../../shared/GetLocationFunctions/getUserLocation";
import { fetchEventsByCity } from "../../screens/Map/fetchEventsByCity";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IEvent, ILocation } from "../../Types/Events";
import { getAuth } from "firebase/auth";

async function fetchCityParties(userLocation: ILocation) {
  const db = getFirestore();
  const collectionRef = collection(
    db,
    "EVENTS",
    `${userLocation}`,
    "UserEvents"
  );

  return await getDocs(collectionRef)
    .then((r) => {
      return r.docs;
    })
    .catch((e) => Alert.alert(e));
}

export const fetch_events = createAsyncThunk(
  "events/fetch_events",
  async () => {
    return getUserLocation().then((res) => {
      return fetchEventsByCity(res);
    });
  }
);

export const fetch_joined_events = async (): Promise<IEvent[]> => {
  const db = getFirestore();
  const auth = getAuth();
  const collectionRef = collectionGroup(
    db,

    "Joined_Events"
  );
  return await getDocs(collectionRef).then((res) =>
    res.docs.map((doc) => doc.data() as IEvent)
  );
};
