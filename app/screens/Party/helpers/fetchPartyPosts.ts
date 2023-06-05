import { collection, getDocs, getFirestore } from "firebase/firestore";

export async function fetchPartyPosts(partyID: string) {
  const db = getFirestore();
  const docsRef = collection(db, `PARTIES_POSTS`, `${partyID}`, `USERS_POSTS`);

  return await getDocs(docsRef).then((snapshot) =>
    snapshot.docs.map((doc) => doc.data())
  );
}
