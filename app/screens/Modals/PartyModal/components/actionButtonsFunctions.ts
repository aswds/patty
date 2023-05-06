import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { IEvent, IFullAddress } from "./../../../../Types/Events";
export async function deleteParty(
  partyID: IEvent["partyID"],
  city: IFullAddress["city"],
  rsvp: IEvent["rsvp"]
) {
  const db = getFirestore();

  const partyRef = doc(db, "EVENTS", `${city}`, `${rsvp}`, `${partyID}`);

  return await deleteDoc(partyRef);
}
