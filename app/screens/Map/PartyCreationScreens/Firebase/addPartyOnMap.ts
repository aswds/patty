import { doc, increment, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../firebase";
import type { IEvent } from "../../../../Types/Events";
import { getAuth } from "firebase/auth";
import { Alert } from "react-native";
import { formatISO } from "date-fns";

export async function addPartyOnMap(data: IEvent) {
  const auth = getAuth();
  const DB_references = {
    events: doc(
      db,
      `EVENTS`,
      `${data.location.fullAddressInfo?.city}`,
      `${data.party_access || data.user.uid}`,
      `${auth.currentUser?.uid}`
    ),
    user: doc(db, "USERS", `${auth.currentUser?.uid}`),
  };
  const addParty = () =>
    new Promise(async (resolve) => {
      await setDoc(DB_references.events, {
        ...data,
        partyID: DB_references.events.id,
        time: data.time as string,
        createdAt: formatISO(new Date()),
        isViaInvite: data.party_access === "Via Invite",
      }).then(() => {
        resolve("Success");
      });
    });

  const addUserPartyCount = () =>
    new Promise(async (resolve, reject) => {
      await updateDoc(DB_references.user, {
        "events.eventsCreated": increment(1),
      });
    });

  addParty(), addUserPartyCount();
}
