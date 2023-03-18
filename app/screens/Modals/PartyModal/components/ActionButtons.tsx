import { StyleSheet, View } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import IconButton from "../../../../shared/Icons/IconButton";
import { colors } from "../../../../src/colors";
import { FontFamily } from "../../../../../assets/fonts/Fonts";

export function ActionButtons() {
  return (
    <View style={styles.actionsButtonContainer}>
      <IconButton
        text={"Share"}
        Icon={Entypo}
        name={"share"}
        textStyle={styles.iconTextStyle}
        onPress={() => {}}
      />
      <IconButton
        text={"Report"}
        Icon={MaterialIcons}
        name={"report"}
        textStyle={styles.iconTextStyle}
        onPress={() => {}}
      />
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