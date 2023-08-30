// Import the required functions from Firestore
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { Alert } from "react-native";

// Function to delete the user account from Firestore
export async function deleteUserAccount(uid: string, onDelete: () => void) {
  try {
    // Get a reference to the Firestore database
    const db = getFirestore();

    // Specify the path to the user document using the UID
    const userDocRef = doc(db, "USERS", uid);

    // Delete the user document
    await deleteDoc(userDocRef);
    onDelete();
  } catch (error) {
    Alert.alert("Error deleting user account:", error.message);
  }
}
