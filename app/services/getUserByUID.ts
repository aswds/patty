import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { IUser } from "../Types/User";

export async function getUserByUID(
  uid: string | undefined
): Promise<IUser | undefined> {
  const docRef = doc(db, `USERS/${uid}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as IUser;
  } else {
    return;
  }
}
