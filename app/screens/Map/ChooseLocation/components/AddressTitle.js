import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors } from "../../../../src/colors";
import { IAddress } from "../types";
const AddressTitle = ({ Address }) => {
  return (
    <View style={styles.addressTitleContainer} pointerEvents="none">
      <Text style={styles.textStyle}>{Address}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  addressTitleContainer: {
    height: "10%",
    maxWidth: "90%",
    position: "absolute",
    bottom: "20%",
    alignSelf: "center",
  },
  textStyle: {
    fontFamily: "WorkSans-Bold",
    fontSize: 16,
    textAlign: "center",
    color: colors.iconColor,
  },
});
export default AddressTitle;
