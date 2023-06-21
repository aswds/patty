import { nanoid } from "@reduxjs/toolkit";
import {
  deleteDoc,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
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
  mediaType: string,
  updateProgress: (progress: number) => void,
  uploadedSuccessfully: () => void
) {
  return new Promise(async (response, rej) => {
    try {
      const fileExtension = fileUri.split(".").pop(); // Get the file extension
      const fileName = `${Date.now()}.${
        fileExtension === "MOV" ? "mp4" : fileExtension
      }`;
      const storageRef = ref(storage, `partiesMedia/${partyID}/${fileName}`);
      const db = getFirestore();

      const res = await fetch(fileUri);
      // const blob = undefined;
      const blob = await res.blob();
      const docID = nanoid();
      if (blob) {
        const uploadTask = uploadBytesResumable(storageRef, blob);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = snapshot.bytesTransferred / snapshot.totalBytes;
            updateProgress(progress);
          },
          (error) => {
            console.error("Error uploading file:", error);
            throw error;
          },
          async () => {
            const downloadURL = await getDownloadURL(storageRef);
            const partyPostRef = doc(
              db,
              "PARTIES_POSTS",
              partyID,
              "USERS_POSTS",
              docID
            );
            await setDoc(partyPostRef, {
              ...postData,
              createdAt: serverTimestamp(),
              likes: [],
              mehs: [],
              media: downloadURL,
              id: docID,
              fileName: fileName,
              mediaType: mediaType,
            });
            uploadedSuccessfully();
          }
        );
      }
      response("boby");
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  });
}

// Delete a party post
export async function deletePartyPost(partyID: string, postID: string) {
  const storageRef = ref(storage, `partiesMedia/${partyID}/${postID}`);
  const db = getFirestore();

  try {
    // Delete the media file from Firebase Storage
    await deleteObject(storageRef);

    // Delete the post document from Firestore
    const postRef = doc(db, "PARTIES_POSTS", partyID, "USERS_POSTS", postID);
    await deleteDoc(postRef);

    console.log("Post deleted successfully");
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}
