import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";
import { FontFamily } from "../../../assets/fonts/Fonts";
import { colors } from "../../src/colors";
import { FontTypes } from "../../Types/Fonts/FontTypes";

interface BoldText extends PropsWithChildren, TextProps {
  textStyles?: TextStyle;
  weight?: FontTypes;
}

const BoldText: React.FC<BoldText> = ({
  children,
  textStyles,
  weight,
  ...props
}) => {
  return (
    <Text
      style={[
        styles.textStyle,
        { fontFamily: FontFamily[weight ?? "bold"] },
        textStyles,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default BoldText;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: FontFamily.bold,
    fontSize: 13,
    color: colors.text,
  },
});
