import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
export default function UserBio() {
  let NUM_OF_LINES = 5;
  const [style, setStyle] = useState({
    height: null,
    width: "100%",
  });
  const [showMore, setShowMore] = useState(false);

  return (
    <TouchableOpacity
      style={style}
      onPress={() => {
        setStyle({ ...style });
        setShowMore(!showMore);
      }}
    >
      <Text
        numberOfLines={showMore ? null : NUM_OF_LINES}
        style={styles.textStyle}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam
        donec adipiscing tristique risus nec. Pellentesque elit eget gravida cum
        sociis natoque penatibus. Ut pharetra sit amet aliquam id diam maecenas
        ultricies. Tellus orci ac auctor augue mauris augue neque. Amet luctus
        venenatis lectus magna. Varius vel pharetra vel turpis nunc eget lorem.
        Odio aenean sed adipiscing diam donec adipiscing. Nunc sed velit
        dignissim sodales ut. Dui ut ornare lectus sit amet est placerat in
        egestas. Facilisi cras fermentum odio eu feugiat pretium nibh. Cursus
        vitae congue mauris rhoncus aenean. Sed euismod nisi porta lorem mollis
        aliquam ut porttitor. Suspendisse potenti nullam ac tortor vitae purus.
        Tincidunt arcu non sodales neque sodales. Tincidunt vitae semper quis
        lectus nulla. Aliquet nibh praesent tristique magna.
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "WorkSans-Medium",
    color: "white",
  },
});
