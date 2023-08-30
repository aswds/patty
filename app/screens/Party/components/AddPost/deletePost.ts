import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { db } from "../../../../../firebase";
import { Alert } from "react-native";

export async function deletePartyPost(
  partyId: string,
  postId: string,
  fileName: string
) {
  try {
    async function deletePostFromStorage() {
      const storage = getStorage();
      // Delete the media file from Firebase Storage
      const storageRef = ref(storage, `partiesMedia/${partyId}/${fileName}`);
      await deleteObject(storageRef);
    }
    async function deletePostFromDB() {
      const postRef = doc(db, "PARTIES_POSTS", partyId, "USERS_POSTS", postId);
      await deleteDoc(postRef);
    }
    // Delete the post document from Firestore
    Promise.all([deletePostFromStorage(), deletePostFromDB()]);
  } catch (error) {
    Alert.alert("Error", error.message);
  }
}
