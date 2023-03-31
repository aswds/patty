import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { IEvent, IFullAddress } from "./../../../../Types/Events";
export async function deleteParty(
  partyID: IEvent["partyID"],
  city: IFullAddress["city"]
) {
  const db = getFirestore();

  const partyRef = doc(db, "EVENTS", `${city}`, `UserEvents`, `${partyID}`);

  await deleteDoc(partyRef);
}
