import React from "react";
import { View, Text } from "react-native";
export default function ACAskImage(props) {
  const { styles, route } = props;
  return (
    <View style={{ maxWidth: "99%" }}>
      <Text style={styles.title}>
        Nice to meet you {route.params?.name} {route.params?.surname}!
      </Text>
      <Text style={styles.textStyle}>It's time to choose your avatar!</Text>
    </View>
  );
}
