import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import CustomButton from "../../PartyCreationScreen/components/LocationAddButton";
import {Entypo} from "@expo/vector-icons";
import {colors} from "../../../../src/colors";

export default function SwitchDateType({
  onPress,
  isConfirmButtonShown,
  onDone,
  dateMode,
}) {
  return (
    <View style={styles.buttonContainer}>
      <CustomButton
        onPress={onPress}
        title={dateMode === "date" ? "Pick a time" : "Pick a date"}
      />
      {isConfirmButtonShown && (
        <TouchableOpacity style={styles.doneButton} onPress={onDone}>
          <Entypo name="check" size={30} color={colors.doneButtonText} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  doneButton: {
    backgroundColor: colors.doneButtonBG,
    borderRadius: 99999,
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
    height: 50,
    right: 0,
    position: "absolute",
  },
});
