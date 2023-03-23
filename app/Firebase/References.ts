import { collection } from "firebase/firestore";
import { db } from "../../firebase";

export const eventReference = (userLocation: string) =>
  collection(db, "EVENTS", `Ужгородський район`, "UserEvents");
