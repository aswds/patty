import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getUserLocation } from "../../shared/GetLocationFunctions/getUserLocation";
import { fetchEventsByCity } from "../../screens/Map/fetchEventsByCity";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IEvent } from "../../Types/Events";
import { getAuth } from "firebase/auth";

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
  const collectionRef = collection(
    db,
    `JOINED_EVENTS`,
    `${auth.currentUser?.uid}`,
    `Joined_Events`
  );
  return await getDocs(collectionRef).then((res) =>
    res.docs.map((doc) => doc.data() as IEvent)
  );
};
