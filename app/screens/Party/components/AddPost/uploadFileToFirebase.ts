import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import * as FileSystem from "expo-file-system";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { nanoid } from "@reduxjs/toolkit";

// Initialize Firebase Storage
const storage = getStorage();

interface IPartyPostData {
  description: string;
}
// Upload an image or video file to Firebase Storage
export async function uploadPartyPost(
  fileUri: string,
  postData: IPartyPostData,
  partyID: string,
  mediaType: string
) {
  try {
    const fileExtension = fileUri.split(".").pop(); // Get the file extension
    const fileName = `${Date.now()}.${fileExtension}`; // Generate a unique filename
    const storageRef = ref(storage, `partiesMedia/${partyID}/${fileName}`);
    const db = getFirestore();

    const res = await fetch(fileUri);
    const blob = await res.blob();
    if (blob) {
      uploadBytesResumable(storageRef, blob).then(async (url) => {
        const downloadURL = await getDownloadURL(storageRef);
        const partyPostRef = collection(
          db,
          `PARTIES_POSTS`,
          `${partyID}`,
          `USERS_POSTS`
        );
        await addDoc(partyPostRef, {
          ...postData,
          createdAt: serverTimestamp(),
          like: 0,
          meh: 0,
          media: downloadURL,
          id: nanoid(),
          mediaType: mediaType,
        });
      });
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
