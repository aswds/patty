import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colors } from "../../src/colors";
import { FontFamily } from "../../../assets/fonts/Fonts";

interface AlertButtonProps {
  onPress: () => void;
  style: "cancel" | "ok";
  text?: string;
  textStyle?: TextStyle;
}

const AlertButton: React.FC<AlertButtonProps> = ({
  onPress,
  style,
  text,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { borderLeftWidth: style === "cancel" ? 1 : 0 }]}
      onPress={onPress}
    >
      <Text
        style={[
          style === "ok"
            ? styles.okButtonTextStyle
            : styles.cancleButtonTextStyle,
          textStyle,
        ]}
      >
        {text ?? style}
      </Text>
    </TouchableOpacity>
  );
};

export default AlertButton;

const styles = StyleSheet.create({
  button: {
    borderTopWidth: 1,
    borderColor: colors.background,
    alignItems: "center",
    justifyContent: "center",

    width: "100%",
    padding: 10,
  },
  okButtonTextStyle: {
    color: colors.text,
    textAlign: "center",
    fontFamily: FontFamily.bold,
  },
  cancleButtonTextStyle: {
    color: colors.accentColor,
    textAlign: "center",
    fontFamily: FontFamily.bold,
    borderLeftWidth: 1,
    borderColor: colors.background,
  },
});
