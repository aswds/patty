import firebase from "firebase";

export function createUser(email, name) {
  const username = name;
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .set({
      email: email,
      verifiedEmail: false,
      username: username,
      searchUsername: username.toLowerCase(),
      name: name,
      country: "",
      city: "",
      phoneNumber: "",
      userImage: "",
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      userUID: firebase.auth().currentUser.uid,
    })
    .then(() => {
      uploadImage(image);
    });
}
