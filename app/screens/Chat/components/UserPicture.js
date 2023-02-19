import React from "react";

import { Image, StyleSheet, View } from "react-native";

const UserPicture = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/images/noImage-01.png")}
        style={styles.imageStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1 / 1,
  },
  imageStyle: { height: "100%", width: "100%", borderRadius: 9999 },
});
export default UserPicture;
