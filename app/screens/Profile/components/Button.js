import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../../src/colors";

function Button({ style, onPress, text, textStyled }) {
  return (
    <TouchableOpacity style={[styles.buttonBG, style]} onPress={onPress}>
      <Text style={[styles.textStyle, textStyled]}>{text}</Text>
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
export default Button;
