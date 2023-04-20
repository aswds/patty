import { collection, doc } from "firebase/firestore";
import { db } from "../../firebase";

export const eventReference = (userLocation: string) =>
  collection(db, "EVENTS", `${userLocation}`, "UserEvents");

  export const userReference = (userUID:string) => doc(db, `USERS`, `${userUID}`)