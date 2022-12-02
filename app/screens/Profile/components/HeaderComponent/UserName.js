import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../../../src/colors";
import Container from "./Container";
export default function UserName({ user }) {
  return (
    <View>
      <View style={styles.nameStyle}>
        <Text style={styles.textStyle}>
          {user.name} {user.surname}
        </Text>
      </View>
      <View style={styles.usernameStyle}>
        <Text
          style={[styles.textStyle, { color: colors.iconColor, fontSize: 14 }]}
        >
          @{user.username}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    fontFamily: "WorkSans-Bold",
    fontSize: 18,
  },
  nameStyle: {},
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
