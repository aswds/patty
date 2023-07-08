import * as Haptics from "expo-haptics";

export const handleRatingPress = (
  ratingType: "meh" | "like",
  oppositeRating: string[],
  currentRating: string[],
  uid: string,
  setOppositeRating: (oppositeRating: string[]) => void,
  setCurrentRating: (currentRating: string[]) => void,
  handleRatePost: (rating: "meh" | "unmeh" | "like" | "unlike") => void
) => {
  const isAlreadyRated = currentRating.includes(uid);
  const isOppositeRated = oppositeRating.includes(uid);

  if (isAlreadyRated) {
    // User has already rated, remove rating
    const updatedCurrentRating = currentRating.filter((id) => id !== uid);
    setCurrentRating(updatedCurrentRating);
    handleRatePost(`un${ratingType}`);
  } else {
    if (!isOppositeRated) {
      handleRatePost(ratingType);
    } else {
      const rating = ratingType === "like" ? "unmeh" : "unlike";
      // User has opposite rating, remove it and add current rating
      const updatedOppositeRating = oppositeRating.filter((id) => id !== uid);
      setOppositeRating(updatedOppositeRating);
      handleRatePost(rating);
      handleRatePost(ratingType);
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // User has not rated, add rating
    setCurrentRating((prevRating) => [...prevRating, uid]);
    setOppositeRating([]);
  }

  // Call ratePost function to update Firestore
};
