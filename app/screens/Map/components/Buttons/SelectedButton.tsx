import React from "react";

import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./styles";
import { colors } from "../../../../src/colors";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

interface SelectedButtonProps {
  onPress: () => void;
}
const SelectedButton = ({ onPress }: SelectedButtonProps) => {
  const onEvent = useTypedSelector(
    (state) => state.user_state.current_user.events?.onEvent
  );
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, styles.additionalButton]}
      onPress={onPress}
    >
      <AntDesign
        name={onEvent ? "star" : "staro"}
        size={30}
        color={colors.accentColor}
      />
    </TouchableOpacity>
  );
};

export default SelectedButton;
