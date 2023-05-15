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
import { fetchEventsByCoordinates } from "../../screens/Map/Firebase/fetchEventsByCoordinates";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IEvent, IFullAddress } from "../../Types/Events";
import { getAuth } from "firebase/auth";
import { IUser } from "../../Types/User";
import { userReference } from "../../Firebase/References";
import _ from "lodash";

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
      return fetchEventsByCoordinates(res);
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
export const fetch_joined_event = async (
  city?: IFullAddress["city"],
  party_access?: IUser["events"]["eventType"],
  partyID?: IUser["events"]["onEvent"]
): Promise<IEvent | undefined> => {
  const db = getFirestore();
  const auth = getAuth();
  const docRef = userReference(auth.currentUser?.uid!);
  const user: IUser = await getDoc(docRef).then((res) => <IUser>res.data());
  const collectionRef = doc(db, `EVENTS`, `${city}`, `${party_access}`, `${partyID}`);

  return await getDoc(collectionRef).then((res) => res.data() as IEvent);
};
