import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {colors} from "../../../../../src/colors";

export default function Nickname({ user }) {
  return (
    <View style={styles.usernameStyle}>
      <Text
        style={[styles.textStyle, { color: colors.iconColor, fontSize: 14 }]}
      >
        @{user.username}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  usernameStyle: {
    marginVertical: "1%",
    marginBottom: "4%",
  },
  usernameContainer: {
    width: "70%",
    backgroundColor: "green",
    borderRadius: 0,
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
