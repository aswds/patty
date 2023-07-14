import { formatISO } from "date-fns";
import { getAuth } from "firebase/auth";
import { doc, increment, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../firebase";
import type { IEvent } from "../../../../Types/Events";

export async function addPartyOnMap(data: IEvent) {
  const auth = getAuth();
  const DB_references = {
    events: doc(
      db,
      `EVENTS`,
      `${data.location.fullAddressInfo?.partyLocation}`,
      `${data.party_access || data.user.uid}`,
      `${auth.currentUser?.uid}`
    ),
    user: doc(db, "USERS", `${auth.currentUser?.uid}`),
  };
  const addParty = async () => {
    await setDoc(DB_references.events, {
      ...data,
      partyID: DB_references.events.id,
      time: data.time as string,
      createdAt: formatISO(new Date()),
      isViaInvite: data.party_access === "Via Invite",
    });
  };

  const addUserPartyCount = async () => {
    await updateDoc(DB_references.user, {
      "events.eventsCreated": increment(1),
    });
  };

  await Promise.all([addParty(), addUserPartyCount()]);
}
