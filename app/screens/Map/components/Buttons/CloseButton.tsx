import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../src/colors";
import React from "react";

export function CloseButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Ionicons name="close" size={40} color={colors.iconColor} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignSelf: "flex-end",
    top: "5%",
    right: "5%",
    zIndex: 10,
  },
});
