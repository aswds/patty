import React, { Dispatch, SetStateAction, useEffect } from "react";
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../src/colors";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
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
