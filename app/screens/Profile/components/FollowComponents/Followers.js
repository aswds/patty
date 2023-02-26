import React from "react";
import {Text, View} from "react-native";

export default function Followers(props) {
  const { styles, followers } = props;
  return (
    <View style={styles.followContainer}>
      <Text style={styles.followNubmerStyle}>{followers}</Text>
      <Text style={styles.textStyle}>Followers</Text>
    </View>
  );
}
