import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../../../src/colors";
export default function UserFollowers(user) {
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
        32 <Text style={styles.followTextStyle}>followers</Text>
      </Text>
      <Text style={[styles.textStyle, { marginLeft: "5%" }]}>
        32 <Text style={styles.followTextStyle}>following</Text>
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  followTextStyle: {
    fontFamily: "WorkSans-Regular",
    color: colors.iconColor,
  },
  textStyle: {
    fontFamily: "WorkSans-Bold",
    color: "white",
    height: 20,
    maxWidth: "90%",
  },
});
