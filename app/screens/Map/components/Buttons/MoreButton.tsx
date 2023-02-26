import React from "react";

import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";
import { colors } from "../../../../src/colors";

interface MoreButtonProps {
  onPress: () => void;
}
const MoreButton = ({ onPress }: MoreButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, styles.additionalButton]}
      onPress={onPress}
    >
      <Feather name="more-horizontal" size={30} color={colors.accentColor} />
    </TouchableOpacity>
  );
};

export default MoreButton;
