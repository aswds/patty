import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../../src/colors";

export default function PartyCreationScreen() {
  return <View style={styles.container}></View>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopRightRadius: 45,
    borderTopLeftRadius: 45,
    backgroundColor: colors.background,
  },
});
