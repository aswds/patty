import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../../src/colors";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { FontFamily } from "../../../../../assets/fonts/Fonts";

export default function Buttons(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.button1]}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          navigation.navigate("SignUpNav", { screen: "NameInfo" });
        }}
      >
        <Text style={styles.textStyle}>Sign up</Text>
        <View style={{ marginLeft: "5%" }}>
          <Ionicons
            name="ios-arrow-forward-circle-sharp"
            size={25}
            color={colors.text}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.button2]}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          navigation.navigate("SignInNav", { screen: "SignInScreen" });
        }}
      >
        <Text style={[styles.textStyle, { color: colors.text }]}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button: {
    height: 45,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  button1: {
    backgroundColor: colors.accentColor,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  button2: {
    marginTop: "10%",
    borderRadius: 15,

    borderColor: "#C2C2C2",
  },
  textStyle: {
    color: colors.text,
    fontFamily: FontFamily.extra_bold,
  },
});
