import { addDoc, collection, Timestamp } from "firebase/firestore";
import { auth, db } from "../../../../firebase";

export async function addPartyOnMap(data) {
  const partiesRef = collection(
    db,
    `PARTIES`,
    `${auth.currentUser.uid}`,
    "UserParties"
  );

  await addDoc(partiesRef, {
    ...data,
    createdAt: Timestamp.fromDate(new Date()).toJSON() || new Date(),
  }).then(() => {});
}
