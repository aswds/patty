import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontFamily } from "../../../assets/fonts/Fonts";
import { colors } from "../../src/colors";

const ListLoader = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size={"large"} color={colors.accentColor} />
      <Text style={styles.textStyle}>Loading</Text>
    </View>
  );
};

export default ListLoader;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  textStyle: {
    fontFamily: FontFamily.bold,
    color: colors.accentColor,
  },
});
