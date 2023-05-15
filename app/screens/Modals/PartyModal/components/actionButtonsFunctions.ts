import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { IEvent, IFullAddress } from "./../../../../Types/Events";
export async function deleteParty(
  partyID: IEvent["partyID"],
  city: IFullAddress["city"],
  party_access: IEvent["party_access"]
) {
  const db = getFirestore();

  const partyRef = doc(
    db,
    "EVENTS",
    `${city}`,
    `${party_access}`,
    `${partyID}`
  );

  return await deleteDoc(partyRef);
}
