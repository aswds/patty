import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { IEvent } from "../../../Types/Events";

export async function fetchUserJoinedEvents() {
  const current_user_uid = getAuth().currentUser?.uid;
  const db = getFirestore();
  const doc_ref = collection(db, `JOINED_EVENTS`, `${current_user_uid}`);
  const snapshot = await getDocs(doc_ref);

  return snapshot.docs.forEach((doc) => doc.data());
}

export async function joinEvent(data: IEvent) {
  const current_user_uid = getAuth().currentUser?.uid;
  const db = getFirestore();
  const doc_ref = collection(
    db,
    `JOINED_EVENTS`,
    `${current_user_uid}`,
    `Joined_Events`
  );
  await addDoc(doc_ref, { ...data }).then(() => console.log("Congratulation"));
}
