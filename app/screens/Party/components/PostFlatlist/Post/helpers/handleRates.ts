import * as Haptics from "expo-haptics";
import { useState } from "react";

export const handleMehsPress = (
  mehs: string[],
  uid: string,
  setMehs: (mehs: string[]) => void,
  setLikes: (likes: string[]) => void,
  handleRatePost: (type: string) => void
) => {
  if (mehs?.includes(uid)) {
    // User has already mehed, remove meh
    const updatedMehs = mehs.filter((id) => id !== uid);
    setMehs(updatedMehs);
  } else {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // User has not mehed, add meh
    setMehs((mehs) => [...mehs, uid]);
    setLikes([]);
  }
  // Call ratePost function to update Firestore
  handleRatePost("meh");
};

export const handleLikesPress = (
  likes: string[],
  uid: string,
  setLikes: (likes: string[]) => void,
  setMehs: (mehs: string[]) => void,
  handleRatePost: (type: string) => void
) => {
  if (likes?.includes(uid)) {
    // User has already liked, remove like
    const updatedLikes = likes.filter((id) => id !== uid);
    setLikes(updatedLikes);
  } else {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // User has not liked, add like
    setLikes((likes) => [...likes, uid]);
    setMehs([]);
  }

  // Call ratePost function to update Firestore
  handleRatePost("like");
};
