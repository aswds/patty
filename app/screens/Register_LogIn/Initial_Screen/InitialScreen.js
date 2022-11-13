import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { colors } from "../../../src/colors";
import { Logo } from "../components/Logo";
import Buttons from "./components/Buttons";

export default function InitialScreen() {
  const navigation = useNavigation();
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
    backgroundColor: "#202020",
    justifyContent: "space-around",
  },
  subContainer: {
    width: "100%",
    alignItems: "center",
  },
});
