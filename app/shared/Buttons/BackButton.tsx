import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { colors } from "../../src/colors";
import { isAndroid } from "../../src/platform";
import React, { FC } from "react";

interface BackButtonProps {
  navigation: any;
  style: ViewStyle;
  iconColor: string;
}

export const BackButton: FC<BackButtonProps> = ({
  navigation,
  style,
  iconColor,
}) => {
  return (
    <TouchableOpacity
      style={[styles.arrowContainer, style]}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <FontAwesome5
        name="arrow-left"
        size={isAndroid ? 25 : 30}
        color={iconColor ?? colors.buttonTextColor}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  arrowContainer: {
    height: 50,
    aspectRatio: 1,
    position: "absolute",
    zIndex: 1,
    left: isAndroid ? 0 : 15,
    top: 0,
    justifyContent: "center",
    alignItems: "center",
    margin: isAndroid ? 10 : 0,
    backgroundColor: colors.accentColor,
    padding: 10,
    borderRadius: 30,
  },
});