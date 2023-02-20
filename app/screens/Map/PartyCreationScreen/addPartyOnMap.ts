import {
  doc,
  increment,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import type { IDoc } from "../../../Types/Type";
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
    user: doc(db, "Users", `${auth?.currentUser?.uid}`),
  };

  const addParty = new Promise(async () => {
    await setDoc(DB_references.parties, {
      ...data,
      createdAt: Timestamp.fromDate(new Date()).toJSON() || new Date(),
    }).then(() => {});
  });
  const addUserPartyCount = new Promise(async () => {
    await updateDoc(DB_references.user, {
      parties: increment(1),
    }).then(() => {});
  });
  await Promise.all([addParty, addUserPartyCount]);

  // const partiesRef = doc(
  //   db,
  //   `PARTIES`,
  //   `${data?.location?.fullAddressInfo?.City}`,
  //   `UserParties`,
  //   `${auth.currentUser.uid}`
  // );
  // const userRef = doc(db, "Users", auth.currentUser.uid);
}
