import React from "react";
import {
  View,
  Text,
  ProgressBarAndroid,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import ProgressBar from "./ProgressBar";
import { colors } from "../../src/colors";
import { FontFamily } from "../../../assets/fonts/Fonts";

const UploadProgressBar = () => {
  const uploadProgress = useTypedSelector(
    (state) => state.upload.uploadProgress
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post Upload</Text>
      <View style={{ width: "100%" }}>
        <ProgressBar progress={uploadProgress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
    color: colors.text_2,
  },
  progressBar: {
    width: "80%",
  },
});

export default UploadProgressBar;
