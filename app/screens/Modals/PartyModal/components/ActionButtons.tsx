import { Alert, StyleSheet, View } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import IconButton from "../../../../shared/Icons/IconButton";
import { colors } from "../../../../src/colors";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { IUser } from "../../../../Types/User";
import { IEvent, IFullAddress } from "../../../../Types/Events";
import { deleteParty } from "./actionButtonsFunctions";
import { leaveEvent } from "../../../Map/Firebase/leaveEvents";

interface ActionButtonsProps {
  party: IEvent;
  closeModal: () => void;
  handleAlertError: (
    title: string,
    message: string,
    cancelText: string,
    onCancelCallback: () => void,
    okText: string
  ) => void;
  onPressDelete: () => void;
}

export function ActionButtons({
  party,
  handleAlertError,
  closeModal,
  onPressDelete,
}: ActionButtonsProps) {
  const { uid } = useTypedSelector((state) => state.user_state.current_user);

  return (
    <View style={styles.actionsButtonContainer}>
      <IconButton
        text={"Share"}
        Icon={Entypo}
        name={"share"}
        textStyle={styles.iconTextStyle}
        onPress={() => {}}
      />

      {party?.user.uid != uid && (
        <IconButton
          text={"Report"}
          Icon={MaterialIcons}
          name={"report"}
          textStyle={styles.iconTextStyle}
          onPress={() => {}}
        />
      )}
      {party?.user.uid == uid && (
        <IconButton
          text={"Delete"}
          Icon={MaterialIcons}
          name={"delete-forever"}
          textStyle={styles.iconTextStyle}
          onPress={() => {
            handleAlertError(
              "Delete Party",
              "Are you sure you want to delete this party?",
              "Delete",
              onPressDelete,
              "Cancel"
            );
          }}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  actionsButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: "5%",
    width: "100%",
  },
  iconTextStyle: {
    color: colors.text,
    fontFamily: FontFamily.bold,
  },
});
