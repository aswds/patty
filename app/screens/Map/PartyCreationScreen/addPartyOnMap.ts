import {
  doc,
  increment,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import type { IDoc } from "../../../Types/Parties";
import { getAuth } from "firebase/auth";

export async function addPartyOnMap(data: IDoc) {
  const auth = getAuth();

  const DB_references = {
    parties: doc(
      db,
      `PARTIES`,
      `${data?.location?.fullAddressInfo?.City}`,
      `UserParties`,
      `${auth?.currentUser?.uid}`
    ),
    user: doc(db, "USERS", `${auth?.currentUser?.uid}`),
  };

  const addParty = () =>
    new Promise(async () => {
      await setDoc(DB_references.parties, {
        ...data,
        createdAt: Timestamp.fromDate(new Date()).toJSON() || new Date(),
        creator: auth?.currentUser?.uid,
      });
    });
  const addUserPartyCount = () =>
    new Promise(async () => {
      await updateDoc(DB_references.user, {
        partiesCreated: increment(1),
      });
    });
  return await Promise.all([addParty, addUserPartyCount]);
}
