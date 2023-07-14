import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontFamily } from "../../../assets/fonts/Fonts";
import { colors } from "../../src/colors";
import ProgressBar from "./ProgressBar";

const UploadCompression = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Processing</Text>
      <ActivityIndicator size={"small"} />
    </View>
  );
};

export default UploadCompression;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 12,
    marginRight: "1%",
    fontFamily: FontFamily.medium,
    color: colors.text_2,
  },
  progressBar: {
    width: "80%",
  },
});
