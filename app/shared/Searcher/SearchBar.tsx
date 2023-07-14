import { Ionicons } from "@expo/vector-icons";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React from "react";
import {
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../../src/colors";
interface SearchBarProps extends TextInputProps {
  icon?: React.ReactNode;
  containerStyle: ViewStyle;
  onPressClear: () => void;
  snapTo: any;
}

export default function SearchBar({
  containerStyle,
  icon,
  onPressClear,
  snapTo,
  ...textInputProps
}: SearchBarProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {icon}
      <BottomSheetTextInput
        {...textInputProps}
        keyboardAppearance={"dark"}
        onBlur={() => {
          snapTo(1);
        }}
      />
      <TouchableOpacity style={{}} onPress={onPressClear}>
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
