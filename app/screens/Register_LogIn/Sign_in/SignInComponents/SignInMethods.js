// import { FontAwesome } from "@expo/vector-icons";
// import React, { useState, useEffect } from "react";
// import {
//   Modal,
//   Platform,
//   StyleSheet,
//   Text,
//   TouchableWithoutFeedback,
//   View,
// } from "react-native";
// import { AppleButton } from "./AppleButton";
// import { SingInType } from "./SingInType";
// import * as Facebook from "expo-facebook";
// import * as Crypto from "expo-crypto";
// import * as AppleAuthentication from "expo-apple-authentication";
// import * as Haptics from "expo-haptics";
// import { signInWithApple } from "./SignInMethodsFuncs/Apple";
// import Constants from "expo-constants";
// import { signInWithFacebook } from "./SignInMethodsFuncs/Facebook";
// import * as Google from "expo-auth-session/providers/google";
// import * as WebBrowser from "expo-web-browser";
// WebBrowser.maybeCompleteAuthSession();
// const SingInMethods = (props) => {
//   const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
//     clientId:
//       "300387603597-bh4ff3u8ti7l7qq7cvkuuaten7vbrjkb.apps.googleusercontent.com",
//   });
//   function loginWithGoogle() {
//     promptAsync();
//     console.log(response?.type);
//     if (response?.type === "success") {
//       const { id_token } = response.params;

//       const auth = firebase.auth.getAuth();
//       const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
//       firebase.auth.signInWithCredential(auth, credential);
//     }
//   }
//   const usingAndroid = Platform.OS === "android";

//   const [isAppleLoginAvailable, setIsAppleLoginAvailable] = useState(false);

//   useEffect(() => {
//     AppleAuthentication.isAvailableAsync().then(setIsAppleLoginAvailable);
//   }, []);
//   return (
//     <View style={{ ...styles.centeredView }}>
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-evenly",
//           flex: 1,
//           alignItems: "flex-end",
//         }}
//       >
//         <SingInType size={35} name="facebook" onPress={signInWithFacebook} />
//         <SingInType
//           size={40}
//           name="apple"
//           color={isAppleLoginAvailable ? "white" : "grey"}
//           onPress={signInWithApple}
//         />
//         <SingInType size={35} name="google" onPress={loginWithGoogle} />
//       </View>
//     </View>
//   );
// };

// SingInMethods.defaultProps = {
//   facebookAppId: Constants.manifest.extra.facebook.appId,
// };

// const styles = StyleSheet.create({
//   centeredView: {
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   iconStyle: {
//     borderWidth: 2,
//     borderColor: "white",
//     alignItems: "center",
//     width: "100%",
//     height: "100%",
//     justifyContent: "center",
//   },
//   iconContainer: {
//     width: 70,
//     height: 50,
//   },
//   iconText: { fontWeight: "bold", color: "white" },
//   containerSafeArea: {
//     flex: 1,
//     backgroundColor: "black",
//   },
//   modalView: {
//     top: 10,
//     flexDirection: "row",
//     alignItems: "flex-start",
//     width: Platform.OS === "ios" ? "98%" : "100%",
//     height: "35%",
//     backgroundColor: "white",
//     borderTopRightRadius: 40,
//     borderTopLeftRadius: 40,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
// });

// export default SingInMethods;
