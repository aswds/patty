import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { View, ImageBackground } from "react-native";
import Followers from "../Follower_info";
import Loader from "../Loader";
export default function ContainerBG(props) {
  const { styles, insets, image } = props;
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
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/patty-9be57.appspot.com/o/user_images%2FXLs2KPd0QKfO4oJLGgdtlA5tlI83?alt=media&token=e8d926b8-fc01-490e-8b0b-a6f6028816f5",
        }}
        imageStyle={styles.imageStyle}
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
