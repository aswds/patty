import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { EventInvitation, IUser } from "../../../../Types/User";
import {
  userNotificationReference,
  userReference,
} from "../../../../Firebase/References";

import { NotificationTypes } from "../../../../Types/User";
export async function addNotificationForUser(
  notification: NotificationTypes,
  userUID: string
) {
  const userNotificationRef = userNotificationReference(userUID);
  await addDoc(userNotificationRef, {
    ...notification,
    serverTimestamp: serverTimestamp(),
  });
}
