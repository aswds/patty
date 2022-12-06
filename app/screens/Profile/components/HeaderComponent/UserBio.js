import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
export default function UserBio({ user }) {
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
        {user.bio}
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
