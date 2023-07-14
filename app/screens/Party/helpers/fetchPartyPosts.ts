import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import { IPost } from "../components/PostFlatlist/types";

export async function fetchPartyPosts(partyID: string): Promise<IPost[]> {
  const db = getFirestore();
  const docsRef = collection(db, `PARTIES_POSTS`, `${partyID}`, `USERS_POSTS`);
  const q = query(docsRef, orderBy("createdAt", "desc"));
  return await getDocs(q).then((snapshot) =>
    snapshot.docs.map((doc) => doc.data() as IPost)
  );
}
