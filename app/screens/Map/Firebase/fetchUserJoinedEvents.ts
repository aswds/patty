import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  increment,
  updateDoc,
} from "firebase/firestore";
import { IEvent } from "../../../Types/Events";
import { cacheJoinedAt } from "../../Party/helpers/cacheFunctions";
import FieldValue = firebase.firestore.FieldValue;

export async function fetchUserJoinedEvents() {
  const current_user_uid = getAuth().currentUser?.uid;
  const db = getFirestore();
  const doc_ref = collection(db, `JOINED_EVENTS`, `${current_user_uid}`);
  const snapshot = await getDocs(doc_ref);

  return snapshot.docs.forEach((doc) => doc.data());
}
