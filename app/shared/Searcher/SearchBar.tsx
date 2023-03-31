import React from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../src/colors";
interface SearchBarProps extends TextInputProps {
  icon?: React.ReactNode;
  containerStyle: ViewStyle;
}

export default function SearchBar({
  containerStyle,
  icon,
  ...rest
}: SearchBarProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {icon}
      <TextInput {...rest} keyboardAppearance={"dark"} />
      <TouchableOpacity style={{}} onPress={() => {}}>
        <Ionicons name="close-circle" size={24} color={colors.iconColor} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderRadius: 15,
    width: "80%",
    flexDirection: "row",
    backgroundColor: colors.input,
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
