import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { View, ImageBackground } from "react-native";
import useUserImage from "../../../../hooks/useUserImage";
import Followers from "../Follower_info";
import Loader from "../Loader";
export default function ContainerBG(props) {
  const { styles, insets, image } = props;
  const { fetchableImage } = useUserImage(image);
  const source = fetchableImage
    ? { uri: image }
    : require("../../../../../assets/images/noImage-01.png");

  function onLoad(value) {
    setIsLoading(value);
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        style={[
          styles.container,
          {
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
        source={source}
        blurRadius={10}
        imageStyle={styles.imageStyle}
        defaultSource={require("../../../../../assets/images/noImage-01.png")}
      >
        <BlurView
          style={{
            paddingTop: insets.top,
            width: "100%",
            height: "110%",
            alignItems: "center",
            justifyContent: "space-evenly",
            borderBottomLeftRadius: 30,
          }}
          tint={"dark"}
          intensity={22}
        >
          {props.children}
        </BlurView>
      </ImageBackground>
    </View>
  );
}
