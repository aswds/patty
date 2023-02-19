import React from "react";

import { TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../../src/colors";

const SearchBar = ({ containerStyle, inputStyle, ...props }) => {
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
