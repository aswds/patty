import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../../../../../src/colors";

export default function AskUsername(props) {
  return (
    <View
      style={{
        alignSelf: "flex-start",
        flexDirection: "row",
        marginHorizontal: 20,
      }}
    >
      <View>
        <Text style={styles.title}>Aye</Text>
        <Text
          style={{
            fontFamily: "WorkSans-Regular",
            fontSize: 17,
            color: colors.iconColor,
          }}
        >
          It's time to pick username
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontFamily: "WorkSans-Bold",
    fontSize: 35,
    color: colors.buttonTextColor,
  },
  textInput: {
    borderBottomColor: colors.iconColor,
    fontFamily: "WorkSans-Bold",
    paddingVertical: "5%",
    paddingHorizontal: 10,
    width: "100%",
    color: colors.text,
  },
  nextButtonContainer: {
    width: "40%",
    position: "absolute",
    bottom: 10,
    right: 0,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    backgroundColor: colors.accentColor,
    padding: 10,
    borderRadius: 40,
  },
  nextButtonText: {
    fontWeight: "bold",
    color: colors.buttonTextColor,
  },
});
