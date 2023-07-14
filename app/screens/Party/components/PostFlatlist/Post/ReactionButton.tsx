import { AntDesign } from "@expo/vector-icons";
import React, { ReactNode } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../../../../../src/colors";
import { handleMehsPress } from "./helpers/handleRates";
import { FontFamily } from "../../../../../../assets/fonts/Fonts";

interface ReactionButtonProps {
  onPress: () => void;
  backgroundColor: string;
  count: number;
  icon: ReactNode;
}

const ReactionButton: React.FC<ReactionButtonProps> = ({
  onPress,
  backgroundColor,
  count,
  icon,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        {
          backgroundColor: backgroundColor,
        },
      ]}
      onPress={onPress}
    >
      {icon}
      <Text style={styles.buttonText}>{count}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    shadowColor: "white",
    shadowOpacity: 0.3,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 2,
    flexDirection: "row",
    backgroundColor: colors.modalBackground,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 10,
    padding: 5,
    color: colors.text,
    fontFamily: FontFamily.bold,
  },
});

export default ReactionButton;
