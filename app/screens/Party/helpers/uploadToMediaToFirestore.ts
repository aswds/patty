import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

async function uploadMediaToFirestore(
  file: Blob,
  title: string,
  partyId: string
): Promise<string> {
  // Create a reference to the Firebase Storage bucket
  const storageRef = ref(storage, `${Date.now()}_${file.name}`);

  // Upload the file to Firebase Storage
  const snapshot = await uploadBytes(storageRef, file);

  // Get the download URL for the uploaded file
  const downloadURL = await getDownloadURL(snapshot.ref);

  // Create a new Firestore document for the uploaded media
  const mediaRef = doc(collection(firestore, "parties", partyId, "media"));
  await setDoc(mediaRef, {
    title: title,
    filename: snapshot.ref.name,
    downloadURL: downloadURL,
    createdAt: serverTimestamp(),
  });

  // Return the ID of the newly created Firestore document
  return mediaRef.id;
}
