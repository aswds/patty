import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firestore = getFirestore();

// Function to listen to the USERS_POSTS collection
export function listenToUsersPosts(
  partyID: string,
  callback: (docs: any[]) => void
) {
  const usersPostsCollection = collection(
    firestore,
    "PARTIES_POSTS",
    partyID,
    "USERS_POSTS"
  );
  const q = query(usersPostsCollection, orderBy("createdAt", "desc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const docs = snapshot.docs.map((doc) => doc.data());
    callback(docs);
  });

  // Return the unsubscribe function to stop listening
  return unsubscribe;
}

// Function to listen to the USERS_ANNOUNCEMENTS collection
export function listenToUsersAnnouncements(
  partyID: string,
  callback: (docs: any[]) => void
) {
  const usersAnnouncementsCollection = collection(
    firestore,
    "PARTIES_POSTS",
    partyID,
    "USERS_ANNOUNCEMENTS"
  );

  const q = query(usersAnnouncementsCollection, orderBy("createdAt", "desc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const docs = snapshot.docs.map((doc) => doc.data());
    callback(docs);
  });

  // Return the unsubscribe function to stop listening
  return unsubscribe;
}
