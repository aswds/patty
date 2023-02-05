import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import useUserImage from "../../../../hooks/useUserImage";

export default function ContainerBG(props) {
  const { insets, image } = props;
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
        blurRadius={20}
        imageStyle={styles.imageStyle}
        defaultSource={require("../../../../../assets/images/noImage-01.png")}
      >
        <View
          style={{
            paddingTop: insets.top,
            width: "100%",
            height: "110%",
            alignItems: "center",
            justifyContent: "space-evenly",
            borderBottomLeftRadius: 30,
          }}
        >
          {props.children}
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  textStyle: {
    color: "white",
    fontFamily: "WorkSans-Bold",
    fontSize: 15,
  },
});
