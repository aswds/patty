import { MaterialIcons } from "@expo/vector-icons";
import { FC } from "react";
import { StyleSheet } from "react-native";
import { FontFamily } from "../../../../../../assets/fonts/Fonts";
import IconButton from "../../../../../shared/Icons/IconButton";
import { colors } from "../../../../../src/colors";
import {
  AlertConfig,
  pickAlertText,
} from "../../../../Map/helpers/pickAnAlertType";

interface DeletePostProps {
  handleDeletePost: () => void;
}

const DeletePost: FC<DeletePostProps> = ({ handleDeletePost }) => {
  return (
    <IconButton
      size={20}
      text={"delete"}
      Icon={MaterialIcons}
      name={"delete-forever"}
      textStyle={styles.iconTextStyle}
      color={colors.buttonText}
      onPress={handleDeletePost}
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
