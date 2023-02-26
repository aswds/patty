import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {FontFamily} from "../../../../../../assets/fonts/Fonts";

export default function FullName({ user }) {
  return (
    <View style={styles.nameStyle}>
      <Text style={styles.textStyle}>
        {user.name} {user.surname}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    fontFamily: FontFamily.bold,
    fontSize: 18,
  },
  nameStyle: {},
});
