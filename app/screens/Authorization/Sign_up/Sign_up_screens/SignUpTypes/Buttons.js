import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { colors } from "../../../../../src/colors";
import { FontFamily } from "../../../../../../assets/fonts/Fonts";

export default function Buttons() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button1}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }}
      >
        <Text style={styles.textStyle}>Phone number</Text>
        <View style={{ marginLeft: 10 }}>
          <Ionicons
            name="phone-portrait"
            size={25}
            color={colors.buttonTextColor}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button1}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }}
      >
        <Text style={styles.textStyle}>Email address</Text>
        <View style={{ marginLeft: 10 }}>
          <Ionicons
            name="at-outline"
            size={25}
            color={colors.buttonTextColor}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Dimensions.get("window").height * 0.2,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button1: {
    padding: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.accentColor,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  button2: {
    height: 45,
    marginTop: "10%",
    width: "50%",
    backgroundColor: "#363636",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: colors.buttonTextColor,
    fontFamily: FontFamily.semi_bold,
  },
});
