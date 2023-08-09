import { nanoid } from "@reduxjs/toolkit";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../../../../firebase";
import { AnnouncementType } from "./../../../../Types/Events";

export async function addAnnouncement(partyID: string, data: AnnouncementType) {
  
  const docID = nanoid();
  const partyAnnouncementRef = doc(
    db,
    `PARTIES_POSTS`,
    `${partyID}`,
    `USERS_ANNOUNCEMENTS`,
    `${docID}`
  );

  await setDoc(partyAnnouncementRef, {
    ...data,
    id: docID,
    createdAt: serverTimestamp(),
  });
}
