import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { nanoid } from "@reduxjs/toolkit";
import { IEvent } from "../../../Types/Events";

export async function fetchUserJoinedEvents() {
  const current_user_uid = getAuth().currentUser?.uid;
  const db = getFirestore();
  const doc_ref = collection(
    db,
    `JOINED_EVENTS`,
    `${current_user_uid}`,
    `Joined_Events`
  );
  const snapshot = await getDocs(doc_ref);

  return snapshot.docs.forEach((doc) => doc.data());
}

export async function joinEvent(data: IEvent) {
  const current_user_uid = getAuth().currentUser?.uid;
  const db = getFirestore();
  const doc_ref = doc(
    db,
    `JOINED_EVENTS`,
    `${current_user_uid}`,
    `Joined_Events`,
    `${nanoid()}`
  );
  setDoc(doc_ref, { ...data }).then(() => console.log("Congratulation"));
}
