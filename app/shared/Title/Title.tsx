import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { colors } from "../../src/colors";
import React from "react";
import { FontFamily } from "../../../assets/fonts/Fonts";

interface ITitle {
  title?: string;
  icon?: React.ReactNode;
  description?: string;
  fontStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

export function Title({
  title,
  icon,
  description,
  fontStyle,
  containerStyle,
}: ITitle) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.titleContainer}>
        <Text style={[styles.textStyle, fontStyle]}>{title}</Text>
        {icon}
      </View>
      <Text style={styles.descriptionTextStyle}>{description}</Text>
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
    alignItems: "center",
  },
  container: {
    marginBottom: "5%",
    justifyContent: "center",
  },
});
