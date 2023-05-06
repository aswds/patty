import { collection, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { RSVP_Types } from "../Types/Events";

export const eventsReference = (userLocation: string, eventType: RSVP_Types) =>
  collection(db, "EVENTS", `${userLocation}`, `${eventType}`);
export const eventReference = (
  userLocation: string,
  eventType: RSVP_Types,
  path: string
) => doc(db, "EVENTS", `${userLocation}`, eventType, path);

export const userReference = (userUID: string) =>
  doc(db, `USERS`, `${userUID}`);
export const userNotificationReference = (userUID: string) =>
  collection(db, `USERS`, `${userUID}`);
