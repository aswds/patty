import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { userReference } from "../../Firebase/References";
import { IEvent, IFullAddress } from "../../Types/Events";
import { IUser } from "../../Types/User";

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
  // const user: IUser = await getDoc(docRef).then((res) => <IUser>res.data());
  const collectionRef = doc(
    db,
    `EVENTS`,
    `${city}`,
    `${party_access}`,
    `${partyID}`
  );

  return await getDoc(collectionRef).then((res) => res.data() as IEvent);
};
