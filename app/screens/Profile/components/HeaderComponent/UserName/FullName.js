import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { colors } from "../../../../../src/colors";
export default function FullName({ user }) {
  return (
    <View style={styles.nameStyle}>
      <Text style={styles.textStyle}>
        {user.name} {user.surname}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    fontFamily: "WorkSans-Bold",
    fontSize: 18,
  },
  nameStyle: {},
});
