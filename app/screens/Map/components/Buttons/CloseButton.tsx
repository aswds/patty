import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../src/colors";
import React from "react";

export function CloseButton({
  onPress,
  style,
}: {
  onPress: () => void;
  style?: ViewStyle;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Ionicons name="close" size={40} color={colors.iconColor} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",

    alignSelf: "flex-end",
    top: 0,
    right: "1%",
    zIndex: 1,
  },
});
