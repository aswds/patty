import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontFamily } from "../../../../../../assets/fonts/Fonts";
import { colors } from "../../../../../src/colors";

export default function FullName({ user }) {
  return (
    <View style={styles.nameStyle}>
      <Text style={styles.textStyle}>
        {user.name} {user.surname}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    color: colors.text,
    fontFamily: FontFamily.bold,
    fontSize: 18,
  },
  nameStyle: {},
});
