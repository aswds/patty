import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../../src/colors";
import { FontFamily } from "../../../../../assets/fonts/Fonts";

export default function UserFollowers(data) {
  const { user } = data;
  return (
    <View
      style={{
        height: null,
        flexDirection: "row",
        marginVertical: "5%",
        justifyContent: "flex-start",
      }}
    >
      <Text style={styles.textStyle}>
        {user.followers} <Text style={styles.followTextStyle}>followers</Text>
      </Text>
      <Text style={[styles.textStyle, { marginLeft: "5%" }]}>
        {user.following} <Text style={styles.followTextStyle}>following</Text>
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  followTextStyle: {
    fontFamily: FontFamily.regular,
    color: colors.iconColor,
  },
  textStyle: {
    fontFamily: FontFamily.bold,
    color: "white",
    height: 20,
    maxWidth: "90%",
  },
});
