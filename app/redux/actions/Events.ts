import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { getUserLocation } from "../../shared/GetLocationFunctions/getUserLocation";
import { fetchEventsByCity } from "../../screens/Map/Firebase/fetchEventsByCity";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IEvent } from "../../Types/Events";
import { getAuth } from "firebase/auth";
import { IUser } from "../../Types/User";

export const fetch_events = createAsyncThunk(
  "events/fetch_events",
  async () => {
    return getUserLocation().then((res) => {
      return fetchEventsByCity(res);
    });
  }
);

export const fetch_joined_events = async (city: string): Promise<IEvent[]> => {
  const db = getFirestore();
  const auth = getAuth();
  const docRef = doc(db, `USERS`, `${auth.currentUser?.uid}`);
  const user: IUser = await getDoc(docRef).then((res) => <IUser>res.data());
  if (user.events.onEvent.length == 0) return [];
  const collectionRef = collection(db, `EVENTS`, `${city}`, `UserEvents`);
  const q = query(collectionRef, where("partyID", "in", user.events.onEvent));
  return await getDocs(q).then((res) =>
    res.docs.map((doc) => doc.data() as IEvent)
  );
};
