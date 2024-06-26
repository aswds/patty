import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { colors } from "../../src/colors";
import React from "react";
import { FontFamily } from "../../../assets/fonts/Fonts";
import { BackButton } from "../Buttons/BackButton";

interface ITitle {
  title?: string;
  icon?: React.ReactNode;
  modalIcon?: React.ReactNode;
  description?: string;
  fontStyle?: TextStyle;
  containerStyle?: ViewStyle;
  navigation?: any;
  backButtonContainer?: ViewStyle;
  backButtonStyle?: ViewStyle;
}

export function Title({
  title,
  icon,
  description,
  fontStyle,
  containerStyle,
  navigation,
  backButtonStyle,
  modalIcon,
}: ITitle) {
  return (
    <View style={[styles.container, containerStyle]} pointerEvents="auto">
      {navigation && !modalIcon && (
        <View style={styles.backButtonContainer}>
          <BackButton
            navigation={navigation}
            style={[backButtonStyle, { left: 0, position: "relative" }]}
            iconName="arrow-left"
          />
        </View>
      )}

      <View style={{ flexShrink: 1 }}>
        {title && (
          <View style={styles.titleContainer}>
            <Text style={[styles.textStyle, fontStyle]} numberOfLines={1}>
              {title}
            </Text>
            {icon}
          </View>
        )}
        {description && (
          <Text style={styles.descriptionTextStyle} numberOfLines={2}>
            {description}
          </Text>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: "5%",
    alignItems: "center",
    width: "100%",
  },
  backButtonContainer: {
    marginRight: "3%",
  },
  textStyle: {
    color: colors.text,
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
});
