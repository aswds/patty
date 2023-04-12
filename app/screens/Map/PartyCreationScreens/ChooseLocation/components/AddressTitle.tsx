import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../../../src/colors";
import { FontFamily } from "../../../../../../assets/fonts/Fonts";

interface AddressTitleProps {
  Address?: string;
  showOutsideCityError: boolean;
}

const AddressTitle: React.FC<AddressTitleProps> = ({
  Address,
  showOutsideCityError,
}) => {
  const addressTitle = Address ?? (
    <Text style={styles.error}>Cannot pick a location</Text>
  );
  const outsideCityError = showOutsideCityError && (
    <Text style={styles.error}>Cannot pick a location outside your city</Text>
  );
  return (
    <View style={styles.addressTitleContainer} pointerEvents="none">
      <View
        style={{
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        {showOutsideCityError ? (
          <Text style={styles.error}>
            Cannot pick a location outside your city
          </Text>
        ) : (
          <Text style={styles.textStyle}>{addressTitle}</Text>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  addressTitleContainer: {
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingVertical: "5%",

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
    color: "white",
  },
  error: {
    fontFamily: FontFamily.bold,
    color: colors.accentColor,
    fontSize: 16,
    borderRadius: 50,
    textShadowColor: "grey",
    textShadowRadius: 0.5,
  },
});
export default AddressTitle;
