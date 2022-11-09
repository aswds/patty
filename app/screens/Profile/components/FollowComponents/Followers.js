import React from "react";
import { View, Text } from "react-native";
export default function Followers(props) {
  const { styles, followers } = props;
  return (
    <View style={styles.followContainer}>
      <Text style={styles.followNubmerStyle}>{followers}</Text>
      <Text style={styles.textStyle}>Followers</Text>
    </View>
  );
}
