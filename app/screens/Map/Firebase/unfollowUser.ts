import { doc, getFirestore, updateDoc } from "firebase/firestore";
import firebase from "firebase/compat";
import FieldValue = firebase.firestore.FieldValue;

export const unfollowUser = async (
  userUID: string,
  userToFollowUID: string
) => {
  const db = getFirestore();
  const userDocRef = doc(db, "USERS", userUID);
  const userToFollowDocRef = doc(db, "USERS", userToFollowUID);

  // Remove the userToFollowId to the user's list of followers
  await updateDoc(userToFollowDocRef, {
    followers: FieldValue.arrayRemove(userUID),
  });

  // Remove the userId to the userToFollow's list of followed users
  await updateDoc(userDocRef, {
    following: FieldValue.arrayRemove(userToFollowUID),
  });
};
