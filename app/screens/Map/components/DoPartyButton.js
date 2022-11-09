import React from "react";
import { Callout } from "react-native-maps";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
export default function DoPartyButton(props) {
  const { onPress } = props;
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={styles.textStyle}>Throw a party</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: "50%",
    width: "50%",
    backgroundColor: "rgb(210, 40, 45)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "white",
    fontFamily: "WorkSans-Bold",
    fontSize: 13,
  },
});
