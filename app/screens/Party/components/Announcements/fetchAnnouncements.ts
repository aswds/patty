import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import { AnnouncementType } from "../../../../Types/Events";

export async function fetchAnnouncements(
  partyID: string
): Promise<AnnouncementType[]> {
  const db = getFirestore();
  const docsRef = collection(
    db,
    `PARTIES_POSTS`,
    `${partyID}`,
    `USERS_ANNOUNCEMENTS`
  );
  const q = query(docsRef, orderBy("createdAt", "desc"));
  return await getDocs(q).then((snapshot) => {
    if (snapshot.empty) return [];
    return snapshot.docs.map((doc) => doc.data() as AnnouncementType);
  });
}
