import {useEffect, useState} from "react";
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase";

export const useFireStore = (mycollection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, mycollection), (querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setDocs(documents);
    });
    return () => unsub();
  }, [mycollection]);
  return { docs };
};
