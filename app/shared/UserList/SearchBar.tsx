import React, { ComponentProps } from "react";

import { StyleProp, TextInput, TextStyle, View, ViewStyle } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../src/colors";

interface SearchBarProps extends ComponentProps<typeof TextInput> {
  containerStyle: ViewStyle;
  inputStyle: StyleProp<TextStyle>;
}

const SearchBar = ({
  containerStyle,
  inputStyle,
  ...props
}: SearchBarProps) => {
  return (
    <View style={containerStyle}>
      <Feather
        name="search"
        size={30}
        color={colors.accentColor}
        style={{ padding: 10 }}
      />
      <TextInput {...props} style={inputStyle} keyboardAppearance={"dark"} />
    </View>
  );
};

export default SearchBar;
