import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";

export const followUser = async (userUID: string, userToFollowUID: string) => {
  const db = getFirestore();
  const userDocRef = doc(db, "USERS", userUID);
  const userToFollowDocRef = doc(db, "USERS", userToFollowUID);

  // Add the userToFollowId to the user's list of followers
  await updateDoc(userToFollowDocRef, {
    followers: arrayUnion(userUID),
  });

  // Add the userId to the userToFollow's list of followed users
  await updateDoc(userDocRef, {
    following: arrayUnion(userToFollowUID),
  });
};
