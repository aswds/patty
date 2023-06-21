import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { FontFamily } from "../../../../../../assets/fonts/Fonts";
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../../../../src/colors";
import IconButton from "../../../../../shared/Icons/IconButton";
import {
  AlertConfig,
  pickAlertText,
} from "../../../../Map/helpers/pickAnAlertType";

interface DeletePostProps {
  handleAlertError: (
    type: AlertConfig,
    onCancelCallback: () => void,
    onOkCallback?: () => void
  ) => void;
  handleDeletePost: () => void;
}

const DeletePost: FC<DeletePostProps> = ({
  handleAlertError,
  handleDeletePost,
}) => {
  return (
    <IconButton
      size={20}
      text={"delete"}
      Icon={MaterialIcons}
      name={"delete-forever"}
      textStyle={styles.iconTextStyle}
      color={colors.buttonText}
      onPress={() => {
        handleAlertError(pickAlertText("deletePost"), handleDeletePost);
      }}
    />
  );
};

export default DeletePost;

const styles = StyleSheet.create({
  downloadButton: {
    borderRadius: 5,
    alignItems: "center",
  },
  iconTextStyle: {
    fontFamily: FontFamily.regular,
    color: colors.buttonText,
    fontSize: 12,
  },
  downloadIcon: {
    width: 20,
    height: 20,
  },
});
