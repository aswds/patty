import { deleteDoc, getDocs } from "firebase/firestore";

export const deleteSubcollections = async (subcollectionRef) => {
  const subcollectionsSnapshot = await getDocs(subcollectionRef);
  subcollectionsSnapshot.forEach(async (subcollectionDoc) => {
    await deleteDoc(subcollectionDoc.ref);
  });
};
