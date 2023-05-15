import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { IUser } from "../../Types/User";

export async function fetchGuests(guestsUID: string[]): Promise<IUser[]> {
  const db = getFirestore();
  const q = query(collection(db, "USERS"), where("uid", "in", guestsUID));
  const querySnapshot = await getDocs(q).then((res) => res.docs);

  return querySnapshot.map((doc) => <IUser>doc.data());
}
