import { setDoc, doc, updateDoc } from "firebase/firestore";
import { Alert } from "react-native";
import { app, auth, db, storage } from "../../../../../../firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";
export const uploadImage = async (uri, user) => {
  if (!uri) {
    return;
  }
  const userUID = auth.currentUser.uid;

  // const responce = await fetch(uri);
  // const blob = await responce.blob();

  const storageRef = ref(storage, `user_images/${userUID}`);
  fetch(uri)
    .then((response) => response.blob())
    .then((blob) => uploadBytesResumable(storageRef, blob))
    .then(async (res) => await getDownloadURL(res.task.snapshot.ref))
    .then(async (snapshot) => {
      await updateDoc(doc(db, "USERS", userUID), {
        userImage: snapshot,
      }).catch((err) => Alert.alert(err));
      await updateProfile(user, {
        photoURL: snapshot,
      });
    });

  // const task = uploadBytesResumable(storageRef, blob);
  // uploadBytes(storageRef, blob).then((snapshot) => {
  //   console.log(snapshot.metadata.ref.bucket.);
  //   console.log("Uploaded a blob");
  // });

  // const taskProgress = (snapshot) => {
  //   console.log("Transferred:" + snapshot.bytesTransferred);
  // };
  // const taskComplete = () => {
  //   getDownloadURL(task.snapshot.ref).then(async (snapshot) => {
  //     updateDoc(doc(db, "USERS", userUID), {
  //       userImage: snapshot,
  //     }).catch((err) => Alert.alert(err));
  //     await updateProfile(user, {
  //       photoURL: snapshot,
  //     });
  //   });
  // };
  // const taskError = (snapshot) => {
  //   Alert.alert(snapshot);
  // };
  // task.on("state_changed", taskProgress, taskError, taskComplete);
};
