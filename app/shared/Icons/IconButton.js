import React from "react";

import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../src/colors";

export function IconButton({ Icon, name, text, textStyle, ...props }) {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Icon name={name} size={24} color={colors.accentColor} />
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IconButton;
