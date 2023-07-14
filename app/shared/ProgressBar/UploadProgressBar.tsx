import { StyleSheet, Text, View } from "react-native";
import { FontFamily } from "../../../assets/fonts/Fonts";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { colors } from "../../src/colors";
import ProgressBar from "./ProgressBar";

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
