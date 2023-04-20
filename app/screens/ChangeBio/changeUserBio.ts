import { getAuth } from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

export async function changeUserBio(bio: string) {
  const db = getFirestore();
  const auth = getAuth();
  const userRef = doc(db, "USERS", `${auth.currentUser?.uid}`);
  await updateDoc(userRef, {
    bio: bio,
  });
}
