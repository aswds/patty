import * as AppleAuthentication from "expo-apple-authentication";
import * as Crypto from "expo-crypto";
import firebase from "firebase";
import * as Haptics from "expo-haptics";
export const signInWithApple = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  const nonce = Math.random().toString(36).substring(2, 10);
  AppleAuthentication.signOutAsync();
  //   return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, nonce)
  //     .then((hashedNonce) =>
  //       AppleAuthentication.signInAsync({
  //         requestedScopes: [
  //           AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
  //           AppleAuthentication.AppleAuthenticationScope.EMAIL,
  //         ],
  //         nonce: hashedNonce,
  //       })
  //     )
  //     .then((appleCredential) => {
  //       const { identityToken, email, fullName } = appleCredential;
  //       const provider = new firebase.auth.OAuthProvider("apple.com");
  //       const credential = provider.credential({
  //         idToken: identityToken,
  //         rawNonce: nonce,
  //       });
  //       console.log(email);
  //       //   return firebase.auth().signInWithCredential(credential);
  //     })
  //     .then((result) => console.log(result))
  //     .catch((error) => {
  //       // ...
  //     });
};
