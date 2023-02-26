import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontFamily } from "../../../../../assets/fonts/Fonts";

export default function CreatorNames({ users }) {
  return (
    <View>
      <Text style={styles.textStyle} lineBreakMode="tail" numberOfLines={2}>
        You, {users.map((user) => user.name)},
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    fontFamily: FontFamily.regular,
    textAlign: "center",
    color: "#6D6D6D",
  },
});
