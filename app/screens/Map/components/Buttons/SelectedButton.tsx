import React from "react";

import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./styles";
import { colors } from "../../../../src/colors";

interface SelectedButtonProps {
  onPress: () => void;
}
const SelectedButton = ({ onPress }: SelectedButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, styles.additionalButton]}
      onPress={onPress}
    >
      <AntDesign name="staro" size={30} color={colors.accentColor} />
    </TouchableOpacity>
  );
};

export default SelectedButton;
