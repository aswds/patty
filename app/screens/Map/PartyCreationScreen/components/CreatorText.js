import React from "react";
import { StyleSheet, View, Text } from "react-native";
export default function CreatorNames({ users }) {
  return (
    <View>
      <Text style={styles.textStyle} lineBreakMode="tail" numberOfLines={2}>
        You, {users.map((user) => user.name)},
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "WorkSans-Regular",
    textAlign: "center",
    color: "#6D6D6D",
  },
});
