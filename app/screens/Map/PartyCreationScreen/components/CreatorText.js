import React from "react";
import { StyleSheet, View, Text } from "react-native";
export default function CreatorNames({ users }) {
  return (
    <View>
      <Text style={styles.textStyle}>{users.map((user) => user.name)}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "WorkSans-Regular",
  },
});
