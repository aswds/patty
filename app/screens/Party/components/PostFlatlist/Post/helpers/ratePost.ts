import {
  collection,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../../../../firebase";
import { IPost } from "../../types";

export const ratePost = async (
  partyId: string,
  postId: string,
  userId: string,
  rating: "meh" | "like"
) => {
  const postRef = doc(db, "PARTIES_POSTS", partyId, "USERS_POSTS", postId);

  try {
    const postDoc = await getDoc(postRef);

    if (postDoc.exists()) {
      const data = postDoc.data();
      const mehsArray = data?.mehs || [];
      const likesArray = data?.likes || [];

      // Remove user from the opposite reaction array if already present
      const oppositeRatingArray = rating === "meh" ? likesArray : mehsArray;
      const updatedOppositeRatingArray = oppositeRatingArray.filter(
        (uid: string) => uid !== userId
      );

      // Update the appropriate field with the user's reaction
      const updateField = rating === "meh" ? "mehs" : "likes";
      const updatedRatingArray =
        rating === "meh" ? [...mehsArray, userId] : [...likesArray, userId];

      await updateDoc(postRef, {
        [updateField]: updatedRatingArray,
        [rating === "meh" ? "likes" : "mehs"]: updatedOppositeRatingArray,
      });

      return { success: true };
    } else {
      return { success: false, error: "Post not found" };
    }
  } catch (error) {
    console.error("Error rating post:", error);
    return { success: false, error: "Error rating post" };
  }
};
