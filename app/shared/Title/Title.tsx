import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { colors } from "../../src/colors";
import React from "react";
import { FontFamily } from "../../../assets/fonts/Fonts";

interface ITitle {
  title?: string;
  icon?: React.ReactNode;
  modalIcon?: React.ReactNode;
  description?: string;
  fontStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

export function Title({
  title,
  icon,
  modalIcon,
  description,
  fontStyle,
  containerStyle,
}: ITitle) {
  return (
    <View style={[styles.container, containerStyle]}>
      {modalIcon}
      <View>
        <View style={styles.titleContainer}>
          <Text style={[styles.textStyle, fontStyle]}>{title}</Text>
          {icon}
        </View>
        <Text style={styles.descriptionTextStyle}>{description}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    color: colors.iconColor,
    fontSize: 26,
    fontFamily: FontFamily.bold,
  },
  descriptionTextStyle: {
    fontFamily: FontFamily.medium,
    fontSize: 13,
    color: colors.iconColor,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    marginBottom: "5%",
  },
});
