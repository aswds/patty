import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../../../../src/colors";

const DownloadButton = () => {
  return (
    <TouchableOpacity style={styles.downloadButton}>
      <Feather name="download" size={25} color={colors.text} />
    </TouchableOpacity>
  );
};

export default DownloadButton;

const styles = StyleSheet.create({
  downloadButton: {
    borderRadius: 5,
  },
  downloadIcon: {
    width: 20,
    height: 20,
  },
});
