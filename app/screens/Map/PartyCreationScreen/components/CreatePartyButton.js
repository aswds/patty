import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { colors } from "../../../../src/colors";

export default function CreatePartyButton() {
  return (
    <View style={styles.buttonBg}>
      <Text style={styles.textStyle}>Create</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonBg: {
    backgroundColor: colors.accentColor,
    height: 50,
    marginVertical: "10%",
    width: "45%",
    borderRadius: 999999,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  textStyle: {
    fontFamily: "WorkSans-Bold",
    fontSize: 16,
    color: colors.buttonTextColor,
  },
});
