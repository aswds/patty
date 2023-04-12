import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { IEvent } from "../../../Types/Events";
import firebase from "firebase/compat";
import * as EVENTS from "events";
import FieldValue = firebase.firestore.FieldValue;

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
  // references
  const userDoc_ref = doc(db, `USERS`, `${current_user_uid}`);
  const updateRef = doc(
    db,
    `EVENTS`,
    `${data.location?.fullAddressInfo?.city}`,
    `UserEvents`,
    `${data.partyID}`
  );
  //functions
  await updateDoc(updateRef, {
    guests: arrayUnion(current_user_uid),
  });
  await updateDoc(userDoc_ref, {
    "events.onEvent": FieldValue.arrayUnion(data.partyID),
  });
}

export async function leaveEvent(data: IEvent) {
  const current_user_uid = getAuth().currentUser?.uid;
  const db = getFirestore();
  // references
  const userDoc_ref = doc(db, `USERS`, `${current_user_uid}`);
  const eventDoc_ref = doc(
    db,
    `EVENTS`,
    `${data.location?.fullAddressInfo?.city}`,
    `UserEvents`,
    `${data.partyID}`
  );
  //query data from firebase

  //functions
  await updateDoc(eventDoc_ref, {
    guests: FieldValue.arrayRemove(current_user_uid),
  });
  await updateDoc(userDoc_ref, {
    "events.onEvent": FieldValue.arrayRemove(data.partyID),
  });
}
