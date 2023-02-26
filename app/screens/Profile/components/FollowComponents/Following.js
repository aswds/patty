import React from "react";
import {Text, View} from "react-native";

export default function Following(props) {
  const { styles, following } = props;
  return (
    <View style={styles.followContainer}>
      <Text style={styles.followNubmerStyle}>{following}</Text>
      <Text style={styles.textStyle}>Following</Text>
    </View>
  );
}
