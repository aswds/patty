import { nanoid } from "@reduxjs/toolkit";
import { FirebaseError } from "firebase/app";
import {
  addDoc,
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
// import { Video, Image, getRealPath } from "react-native-compressor";

import { Alert } from "react-native";

// Initialize Firebase Storage
const storage = getStorage();

interface IPartyPostData {
  description: string;
  eventRef: object;
}

export async function uploadPartyPost(
  fileUri: string,
  postData: IPartyPostData,
  partyID: string,
  mediaType: string,
  navigation: any,
  updateProgress: (progress: number) => void,
  uploadedSuccessfully: () => void,
  updateCompressStatus: (status: boolean) => void
) {
  try {
    const fileExtension = fileUri.split(".").pop(); // Get the file extension
    const fileName = `${Date.now()}.${fileExtension}`;
    const storageRef = ref(storage, `partiesMedia/${partyID}/${fileName}`);
    const db = getFirestore();
    let compressionResult = null;
    // if (mediaType === "video") {
    //   updateCompressStatus(true);

    //   navigation.goBack();
    //   await Video.compress(fileUri, {
    //     compressionMethod: "auto",
    //   }).then(async (compressedFileUrl) => {
    //     compressionResult = await getRealPath(compressedFileUrl, "video");
    //     updateCompressStatus(false);
    //   });
    // } else {
    //   updateCompressStatus(true);
    //   navigation.goBack();
    //   await Image.compress(fileUri, {
    //     compressionMethod: "auto",
    //   }).then(async (compressedFileUrl) => {
    //     compressionResult = await getRealPath(compressedFileUrl, "image");
    //     updateCompressStatus(false);
    //   });
    // }
    if (compressionResult) {
      const compressedVideo = await fetch(compressionResult);
      const compressedVideoBlob = await compressedVideo.blob();

      const uploadTask = uploadBytesResumable(storageRef, compressedVideoBlob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = snapshot.bytesTransferred / snapshot.totalBytes;
          updateProgress(progress);
        },
        (error) => {
          Alert.alert("ERROR", error.message.toString());
        },
        async () => {
          const docID = nanoid();
          const partyPostRef = doc(
            db,
            "PARTIES_POSTS",
            `${partyID}`,
            "USERS_POSTS",
            `${docID}`
          );
          const downloadURL = await getDownloadURL(storageRef);
          await setDoc(partyPostRef, {
            ...postData,
            createdAt: serverTimestamp(),
            likes: [],
            mehs: [],
            media: downloadURL || null,
            id: docID,
            fileName: fileName,
            mediaType: mediaType,
          });
          uploadedSuccessfully();
        }
      );
    } else {
      Alert.alert("Uploading failed.");
      // hide uploading bar
      updateCompressStatus(false);

      uploadedSuccessfully();
    }
  } catch (error: FirebaseError) {
    Alert.alert("Error uploading file", error?.message);
    // hide uploading bar
    updateCompressStatus(false);
    uploadedSuccessfully();
  }
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
  } catch (error) {
    throw error;
  }
}
