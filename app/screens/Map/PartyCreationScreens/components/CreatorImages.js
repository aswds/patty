import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function CreatorImage({ user, i = 1 }) {
  const userImage = user.userImage
    ? { uri: user.userImage }
    : require("../../../../../assets/images/noImage-01.png");
  const { creator } = user;
  // , { left: i * 20, zIndex: -i }
  return (
    <View style={[styles.imageContainer]}>
      <Image source={userImage} style={{ width: "100%", height: "100%" }} />
    </View>
  );
}
const styles = StyleSheet.create({
  imageContainer: {
    height: 40,
    aspectRatio: 1,
    borderRadius: 100,
    overflow: "hidden",
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: { width: 2, height: 2 },
  },
});
