import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {colors} from "../../../../src/colors";

export default function CustomButton({ onPress, title, style }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: colors.input,
    height: 50,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: 5,
    marginLeft: 0,
  },
  textStyle: {
    color: colors.iconColor,
  },
});
