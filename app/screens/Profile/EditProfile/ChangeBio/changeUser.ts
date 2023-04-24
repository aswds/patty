import { getAuth } from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { IUser } from "../../../../Types/User";

export async function changeUser(data: Partial<IUser>) {
  const db = getFirestore();
  const auth = getAuth();
  const userRef = doc(db, "USERS", `${auth.currentUser?.uid}`);
  await updateDoc(userRef, {
    ...data,
  });
}
