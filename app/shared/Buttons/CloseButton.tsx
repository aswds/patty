import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { FontFamily } from "../../../assets/fonts/Fonts";
import { colors } from "../../src/colors";

interface CloseButtonProps {
  onPress: () => void;
  text?: string;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

const RedButton: React.FC<CloseButtonProps> = ({
  onPress: onClose,
  text,
  containerStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.closeButton, containerStyle]}
      onPress={onClose}
    >
      <Text style={[styles.closeButtonText, textStyle]}>{text ?? `Close`}</Text>
    </TouchableOpacity>
  );
};

export default RedButton;

const styles = StyleSheet.create({
  closeButton: {
    backgroundColor: colors.buttonBG,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: colors.buttonText,
    fontFamily: FontFamily.bold,
  },
});
