import { getAuth } from "firebase/auth";
import firebase from "firebase/compat";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  or,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { IEvent } from "../../../Types/Events";
import { removeCachedPartyScreen } from "../../Party/helpers/cacheFunctions";
import FieldValue = firebase.firestore.FieldValue;

export async function fetchViaInviteParties(city: string): Promise<IEvent[]> {
  const current_user_uid = getAuth().currentUser?.uid;
  const db = getFirestore();
  const Via_Invite_collection_ref = collection(
    db,
    `EVENTS`,
    `${city}`,
    `Via Invite`
  );

  const q = query(
    Via_Invite_collection_ref,
    or(
      where("invited", "array-contains", `${current_user_uid}`),
      where("user.uid", "==", `${current_user_uid}`)
    )
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => doc.data()) as IEvent[];
}

export async function joinEvent(data: IEvent) {
  const current_user_uid = getAuth().currentUser?.uid;
  const db = getFirestore();
  // references
  const userDoc_ref = doc(db, `USERS`, `${current_user_uid}`);
  const updateRef = doc(
    db,
    `EVENTS`,
    `${data.location?.fullAddressInfo?.subregion}`,
    `${data.party_access}`,
    `${data.partyID}`
  );
  //functions
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
    `${data.location?.fullAddressInfo?.subregion}`,
    `${data.party_access}`,
    `${data.partyID}`
  );
  //query data from firebase
  removeCachedPartyScreen();
  //functions
  await updateDoc(eventDoc_ref, {
    guests: FieldValue.arrayRemove(current_user_uid),
  });
  await updateDoc(userDoc_ref, {
    "events.onEvent": FieldValue.delete(),
    "events.eventType": FieldValue.delete(),
  });
}

export async function leaveDeletedEvent() {
  const current_user_uid = getAuth().currentUser?.uid;

  const db = getFirestore();

  const userDoc_ref = doc(db, `USERS`, `${current_user_uid}`);

  return await updateDoc(userDoc_ref, {
    "events.onEvent": FieldValue.delete(),
    "events.eventType": FieldValue.delete(),
  });
}
