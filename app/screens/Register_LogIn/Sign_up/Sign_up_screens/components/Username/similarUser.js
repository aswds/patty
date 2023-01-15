import { doc, getDoc } from "firebase/firestore";

export  function similarUser(username) {
const docRef = doc(db, "USERS", "SF");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
}
