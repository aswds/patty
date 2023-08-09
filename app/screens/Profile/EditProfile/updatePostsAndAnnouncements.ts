import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  writeBatch,
  Firestore,
} from "firebase/firestore";
import { IUser, UserMediaInformation } from "../../../Types/User";
import { image } from "../../../../assets/images";

interface Post {
  id: string;
  userId: string;
  content: string;
  // Add other fields as needed
}

interface Announcement {
  id: string;
  userId: string;
  content: string;
  // Add other fields as needed
}

// Function to update posts and announcements when a user's profile changes
export async function updatePostsAndAnnouncementsOnProfileChange(
  db: Firestore,
  user: UserMediaInformation & { eventRef?: string },
  partyID: string
) {
  try {
    // Step 1: Get the updated user information
    const { name, surname, username, image } = user; // Adjust the fields based on your user data structure

    // Step 2: Get all posts and announcements associated with the user
    const postQuery = query(
      collection(db, "PARTIES_POSTS", `${partyID}`, "USERS_POSTS"),
      where("user.uid", "==", user.uid)
    );
    const announcementQuery = query(
      collection(db, "PARTIES_POSTS", `${partyID}`, "USERS_ANNOUNCEMENTS"),
      where("user.uid", "==", user.uid)
    );
    const eventRef = doc(db, user.eventRef);

    const [postSnapshot, announcementSnapshot] = await Promise.all([
      (await getDocs(postQuery)).docs,
      (await getDocs(announcementQuery)).docs,
    ]);
    const editedUser: UserMediaInformation = {
      image,
      uid: user.uid,
      name,
      surname,
      username,
    };
    const batchUpdate = writeBatch(db);

    // Step 3: Update user information in each post document
    postSnapshot.forEach((postDoc) => {
      const post = postDoc.data() as Post;
      // Here, you can update any fields in the post document that are related to the user's profile
      batchUpdate.update(
        doc(db, "PARTIES_POSTS", `${partyID}`, "USERS_POSTS", post.id),
        { user: { ...editedUser } }
      );
    });

    // Step 4: Update user information in each announcement document
    announcementSnapshot.forEach((announcementDoc) => {
      const announcement = announcementDoc.data() as Announcement;
      // Similar to posts, update any fields in the announcement document related to the user's profile
      batchUpdate.update(
        doc(
          db,
          "PARTIES_POSTS",
          `${partyID}`,
          "USERS_ANNOUNCEMENTS",
          announcement.id
        ),
        // Assuming you have a field for the user's display name and email in each announcement
        { user: { ...editedUser } }
      );
    });

    await updateDoc(eventRef, { user: { ...editedUser } });
    // Step 5: Commit the writeBatch update
    await batchUpdate.commit();
  } catch (error) {}
}
