import { getAuth } from "firebase/auth";
import firebase from "firebase/compat";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  increment,
  or,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { IEvent } from "../../../Types/Events";
import {
  removeCacheJoinedAt,
  removeCachedPartyScreen,
  cacheJoinedAt,
} from "../../Party/helpers/cacheFunctions";
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
    `${data.location?.fullAddressInfo?.partyLocation}`,
    `${data.party_access}`,
    `${data.partyID}`
  );
  //functions
  await cacheJoinedAt(new Date().toISOString());
  await updateDoc(updateRef, {
    guests: arrayUnion(current_user_uid),
  });
  await updateDoc(userDoc_ref, {
    "events.onEvent": data.partyID || data.user.uid,
    "events.eventType": data.party_access,
    "events.eventsVisited": increment(1),
    "events.partyLocation": data.location.fullAddressInfo?.partyLocation,
  });
}

export async function leaveEvent(data: IEvent) {
  const current_user_uid = getAuth().currentUser?.uid;
  const db = getFirestore();
  // references
  const userDoc_ref = doc(db, `USERS`, `${current_user_uid}`);
  //!! The leaveEvent is used when deleting an account, passing only crucial data from delete account screen  {partyLocation: ..., party_access: ..., partyID: ...} without fetching the entire party.
  const eventDoc_ref = doc(
    db,
    `EVENTS`,
    `${data.location?.fullAddressInfo?.partyLocation ?? data?.partyLocation}`,
    `${data.party_access}`,
    `${data.partyID}`
  );
  //remove cache
  await removeCacheJoinedAt();
  await removeCachedPartyScreen();
  //functions
  await updateDoc(eventDoc_ref, {
    guests: FieldValue.arrayRemove(current_user_uid),
  });
  await updateDoc(userDoc_ref, {
    "events.onEvent": FieldValue.delete(),
    "events.eventType": FieldValue.delete(),
    "events.partyLocation": FieldValue.delete(),
    invited: FieldValue.arrayRemove(data.partyID),
  });
}

export async function leaveDeletedEvent() {
  const current_user_uid = getAuth().currentUser?.uid;

  const db = getFirestore();
  await removeCachedPartyScreen();
  await removeCacheJoinedAt();
  const userDoc_ref = doc(db, `USERS`, `${current_user_uid}`);

  return await updateDoc(userDoc_ref, {
    "events.onEvent": FieldValue.delete(),
    "events.eventType": FieldValue.delete(),
    "events.partyLocation": FieldValue.delete(),
  });
}
