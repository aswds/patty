import { setDoc, doc } from "firebase/firestore";
import { Alert } from "react-native";
import { auth, db } from "../../../../../../firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
const storage = require("firebase/storage");
export const uploadImage = async (uri) => {
  const user = auth.currentUser.uid;
  const responce = await fetch(uri);
  const blob = await responce.blob();
  const storage = getStorage();
  const storageRef = ref(storage, "user_images/");
  const task = uploadBytes(storageRef, blob).then((snapshot) => {
    console.log("Uploaded a blob");
  });

  const taskProgress = (snapshot) => {
    console.log("Transferred:" + snapshot.bytesTransferred);
  };
  const taskComplete = () => {
    task.snapshot.ref.getDownloadURL().then((snapshot) => {
      setDoc(doc(db, "USERS", auth.currentUser.uid), {
        userImage: snapshot,
      });
      auth.currentUser.photoURL({ photoURL: snapshot });
    });
  };
  const taskError = (snapshot) => {
    console.log(snapshot);
  };
  task.on("state_changed", taskProgress, taskError, taskComplete);
};
