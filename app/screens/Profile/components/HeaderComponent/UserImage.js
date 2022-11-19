import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import useUserImage from "../../../../hooks/useUserImage";
export default function UserImage({ uri, setIsLoading }) {
  const { fetchableImage } = useUserImage(uri);

  const source = fetchableImage
    ? { uri: uri }
    : require("../../../../../assets/images/noImage-01.png");
  return (
    <View>
      <Image
        source={source}
        style={styles.imageStyle}
        onLoadStart={() => {
          setIsLoading(true);
        }}
        onLoadEnd={() => {
          setIsLoading(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    borderRadius: 100,
    height: "100%",
    aspectRatio: 1,
  },
});
