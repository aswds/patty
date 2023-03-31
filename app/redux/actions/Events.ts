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
import { IEvent, IFullAddress } from "../../Types/Events";
import { getAuth } from "firebase/auth";
import { IUser } from "../../Types/User";

/**
 * fetch_events
 *
 * This function is used to fetch events from the user's current location. It uses the getUserLocation() function to get the user's current location, and then passes it to the fetchEventsByCity() function to get the events in that city.
 *
 * @returns {Promise<IEvent[]>} - A promise containing an array of IEvent objects.
 */
export const fetch_events = createAsyncThunk(
  "events/fetch_events",
  async () => {
    return getUserLocation().then((res) => {
      return fetchEventsByCity(res);
    });
  }
);

/**
 * fetch_joined_events
 *
 * This function is used to fetch events that the user has joined. It takes a city as a parameter and uses the Firebase Firestore API to query the UserEvents collection for events with a partyID that matches one of the user's joined events.
 *
 * @param {IFullAddress["city"]} city - The city to search for events in.
 *
 * @returns {Promise<IEvent[]>} - A promise containing an array of IEvent objects.
 */
export const fetch_joined_events = async (
  city: IFullAddress["city"]
): Promise<IEvent[]> => {
  const db = getFirestore();
  const auth = getAuth();
  const docRef = doc(db, `USERS`, `${auth.currentUser?.uid}`);

  const user: IUser = await getDoc(docRef).then((res) => <IUser>res.data());
  if (!user.events.onEvent || user?.events?.onEvent.length === 0) return [];
  const collectionRef = collection(db, `EVENTS`, `${city}`, `UserEvents`);

  const q = query(collectionRef, where("partyID", "in", user.events.onEvent));

  return await getDocs(q).then((res) =>
    res.docs.map((doc) => doc.data() as IEvent)
  );
};
