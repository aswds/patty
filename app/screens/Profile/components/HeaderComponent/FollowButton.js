import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../../../../src/colors";

export default function FollowButton() {
  return (
    <TouchableOpacity style={styles.buttonBG}>
      <Text style={styles.textStyle}>Edit</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  buttonBG: {
    backgroundColor: colors.buttonBG,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 30,
  },
  textStyle: {
    color: colors.buttonText,
    fontFamily: "WorkSans-Regular",
    fontSize: 13,
  },
});
