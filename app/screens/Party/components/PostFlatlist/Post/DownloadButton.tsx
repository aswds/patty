import {
  AlertType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../../../../src/colors";
import { FontFamily } from "../../../../../../assets/fonts/Fonts";
import moment from "moment";
import { downloadMediaToGallery } from "./helpers/downloadMegiaToGallery";
import {
  AlertConfig,
  pickAlertText,
} from "../../../../Map/helpers/pickAnAlertType";

const DownloadButton = ({
  url,
  handleAlertError,
}: {
  url: string;
  handleAlertError: (
    type: AlertConfig,
    onCancelCallback: () => void,
    onOkCallback?: () => void
  ) => void;
}) => {
  return (
    <TouchableOpacity
      style={styles.downloadButton}
      onPress={() => {
        const config = pickAlertText("downloadPost");
        handleAlertError(
          config,
          () => {
            downloadMediaToGallery(url, "Patty");
          },
          () => {}
        );
        // downloadMediaToGallery(url, "Patty");
      }}
    >
      <Feather name="download" size={20} color={colors.text} />
      <Text
        style={{
          fontFamily: FontFamily.regular,
          color: colors.text,
          fontSize: 12,
        }}
      >
        download
      </Text>
    </TouchableOpacity>
  );
};

export default DownloadButton;

const styles = StyleSheet.create({
  downloadButton: {
    borderRadius: 5,
    alignItems: "center",
  },
  downloadIcon: {
    width: 20,
    height: 20,
  },
});
