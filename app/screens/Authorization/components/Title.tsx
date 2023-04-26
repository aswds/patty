import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontFamily } from "../../../../assets/fonts/Fonts";
import { colors } from "../../../src/colors";

interface TitleProps {
  title: string;
  message: string;
}

export default function Title({ message, title }: TitleProps) {
  return (
    <View
      style={{
        alignSelf: "flex-start",
        flexDirection: "row",
      }}
    >
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text
          style={{
            fontFamily: FontFamily.regular,
            fontSize: 17,
            color: colors.iconColor,
          }}
        >
          {message}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 35,
    color: colors.text,
  },
  textInput: {
    borderBottomColor: colors.iconColor,
    fontFamily: FontFamily.bold,
    paddingVertical: "5%",
    paddingHorizontal: 10,
    width: "100%",
    color: colors.text,
  },
  nextButtonContainer: {
    width: "40%",
    position: "absolute",
    bottom: 10,
    right: 0,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    backgroundColor: colors.accentColor,
    padding: 10,
    borderRadius: 40,
  },
  nextButtonText: {
    fontWeight: "bold",
    color: colors.buttonTextColor,
  },
});
