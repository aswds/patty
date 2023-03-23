import React from "react";

import {StyleSheet, TouchableOpacity} from "react-native";
import {Feather} from "@expo/vector-icons";
import {colors} from "../../../../../src/colors";

const SendButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      pressRetentionOffset={10}
      style={styles.buttonContainer}
    >
      <Feather name={"send"} color={colors.accentColor} size={30} style={{}} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default SendButton;
