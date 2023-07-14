import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { db } from "../../../../../firebase";

export async function deletePartyPost(
  partyId: string,
  postId: string,
  fileName: string
) {
  try {
    const storage = getStorage();
    // Delete the media file from Firebase Storage
    const storageRef = ref(storage, `partiesMedia/${partyId}/${fileName}`);
    await deleteObject(storageRef);

    // Delete the post document from Firestore
    const postRef = doc(db, "PARTIES_POSTS", partyId, "USERS_POSTS", postId);
    await deleteDoc(postRef);

    console.log("Post and media deleted successfully");
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}
