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

interface ActionButtonsProps {
  userUID: IUser["uid"];
  partyID: IEvent["partyID"];
  city: IFullAddress["city"];
  closeModal: () => void;
}

export function ActionButtons({
  userUID,
  partyID,
  city,
  closeModal,
}: ActionButtonsProps) {
  const { uid } = useTypedSelector((state) => state.user_state.current_user);
  const onPressDelete = () => {
    deleteParty(partyID, city);
    closeModal();
  };
  return (
    <View style={styles.actionsButtonContainer}>
      <IconButton
        text={"Share"}
        Icon={Entypo}
        name={"share"}
        textStyle={styles.iconTextStyle}
        onPress={() => {}}
      />

      {userUID != uid && (
        <IconButton
          text={"Report"}
          Icon={MaterialIcons}
          name={"report"}
          textStyle={styles.iconTextStyle}
          onPress={() => {}}
        />
      )}
      {userUID == uid && (
        <IconButton
          text={"Delete"}
          Icon={MaterialIcons}
          name={"delete-forever"}
          textStyle={styles.iconTextStyle}
          onPress={() => {
            Alert.alert("Are you sure?", "", [
              { text: "Delete", style: "destructive", onPress: onPressDelete },
              { text: "Don't", style: "cancel" },
            ]);
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
