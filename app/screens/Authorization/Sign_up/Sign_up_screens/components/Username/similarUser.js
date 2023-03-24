import { doc, getDoc } from "firebase/firestore";

export async function similarUser(username) {
  const docRef = doc(db, "USERS", "SF");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
  } else {
    // doc.data() will be undefined in this case
  }
}
