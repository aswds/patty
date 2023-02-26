import React from "react";

import {TouchableOpacity} from "react-native";
import {Feather} from "@expo/vector-icons";
import {styles} from "./styles";
import {colors} from "../../../../src/colors";

interface SearchButtonProps {
  onPress: () => void;
}

const SearchButton = ({ onPress }: SearchButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, styles.additionalButton]}
      onPress={onPress}
    >
      <Feather name="search" size={30} color={colors.accentColor} />
    </TouchableOpacity>
  );
};

export default SearchButton;
