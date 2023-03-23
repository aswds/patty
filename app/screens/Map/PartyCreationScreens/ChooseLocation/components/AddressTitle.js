import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../../../src/colors";
import { FontFamily } from "../../../../../../assets/fonts/Fonts";

const AddressTitle = ({ Address }) => {
  return (
    <View style={styles.addressTitleContainer} pointerEvents="none">
      <Text style={styles.textStyle}>
        {Address ?? <Text style={styles.error}>Cannot pick a location</Text>}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  addressTitleContainer: {
    height: "10%",
    position: "absolute",
    bottom: "20%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontFamily: FontFamily.bold,
    maxWidth: "90%",
    fontSize: 16,
    textAlign: "center",
    color: colors.iconColor,
  },
  error: {
    fontFamily: FontFamily.bold,
    color: colors.cancel,
  },
});
export default AddressTitle;
