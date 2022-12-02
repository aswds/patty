import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import useUserImage from "../../../../hooks/useUserImage";
import Container from "./Container";
import FollowButton from "./FollowButton";
export default function UserImage({ uri, setIsLoading }) {
  const { fetchableImage } = useUserImage(uri);

  const source = fetchableImage
    ? { uri: uri }
    : require("../../../../../assets/images/noImage-01.png");
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "space-between",
        marginBottom: "5%",
        flexDirection: "row",
        alignItems: "flex-end",
      }}
    >
      <View style={{}}>
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
      <View>
        <FollowButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  imageStyle: {
    borderRadius: "45%",
    height: 100,
    aspectRatio: 1,
  },
});
