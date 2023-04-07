import React from "react";
import { StyleSheet, View } from "react-native";
import { Logo } from "../components/Logo";
import Buttons from "./components/Buttons";
import { colors } from "../../../src/colors";

export default function InitialScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Logo />
      </View>
      <View style={styles.subContainer}>
        <Buttons navigation={navigation} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "space-around",
  },
  subContainer: {
    width: "100%",
    alignItems: "center",
  },
});
