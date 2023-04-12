import { collection, getFirestore, query, where } from "firebase/firestore";
import { IEvent } from "../../../Types/Events";

export async function findEvents(text: string): Promise<IEvent[]> {
  const db = getFirestore();
  const q = query(
    collection(db, "EVENTS", "Ужгородський Район", "UserEvent"),
    where("tags", "array-contains", text),
    where("tags", "array-contains", text)
  );

  return {} as IEvent[];
}
