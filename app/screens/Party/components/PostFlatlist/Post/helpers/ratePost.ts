import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../../../firebase";

export const ratePost = async (
  partyId: string,
  postId: string,
  userId: string,
  rating: "meh" | "like" | "unmeh" | "unlike"
) => {
  const postRef = doc(db, "PARTIES_POSTS", partyId, "USERS_POSTS", postId);

  try {
    const postDoc = await getDoc(postRef);

    if (postDoc.exists()) {
      const data = postDoc.data();
      const mehsArray = data?.mehs || [];
      const likesArray = data?.likes || [];

      // Remove user from the opposite reaction array if already present
      let oppositeRatingArray;
      if (rating === "meh" || rating === "unmeh") {
        oppositeRatingArray = likesArray.filter(
          (uid: string) => uid !== userId
        );
      } else if (rating === "like" || rating === "unlike") {
        oppositeRatingArray = mehsArray.filter((uid: string) => uid !== userId);
      }
      // Update the appropriate field with the user's reaction
      let updateField;
      let updatedRatingArray;
      if (rating === "meh" || rating === "unmeh") {
        updateField = "mehs";
        updatedRatingArray =
          rating === "meh" ? [...mehsArray, userId] : oppositeRatingArray;
      } else if (rating === "like" || rating === "unlike") {
        updateField = "likes";
        updatedRatingArray =
          rating === "like" ? [...likesArray, userId] : oppositeRatingArray;
      }
      const updateData = {
        [updateField]: updatedRatingArray,
      };
      await updateDoc(postRef, updateData);

      return { success: true };
    } else {
      return { success: false, error: "Post not found" };
    }
  } catch (error) {
    console.error("Error rating post:", error);
    return { success: false, error: "Error rating post" };
  }
};
