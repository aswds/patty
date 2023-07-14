import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { IEvent } from "../../../Types/Events";
import { cacheJoinedAt } from "../../Party/helpers/cacheFunctions";
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
    `${data.location?.fullAddressInfo?.partyLocation}`,
    `${data.party_access}`,
    `${data.partyID || data.user.uid}`
  );
  //functions
  await cacheJoinedAt(new Date().toISOString());
  await updateDoc(updateRef, {
    guests: arrayUnion(current_user_uid),
  });
  await updateDoc(userDoc_ref, {
    "events.onEvent": data.partyID || data.user.uid,
    "events.eventType": data.party_access,
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
    `${data.location?.fullAddressInfo?.partyLocation}`,
    `${data.party_access}`,
    `${data.partyID}`
  );
  //query data from firebase
  await AsyncStorage.removeItem("joinedAt");
  //functions
  await updateDoc(eventDoc_ref, {
    guests: current_user_uid,
  });
  await updateDoc(userDoc_ref, {
    "events.onEvent": FieldValue.delete(),
    "events.eventType": FieldValue.delete(),
  });
}
