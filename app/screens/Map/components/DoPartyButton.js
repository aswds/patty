import React, { useState } from "react";
import { Callout } from "react-native-maps";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { colors } from "../../../src/colors";
import { Ionicons } from "@expo/vector-icons";
import { isAndroid } from "../../../src/platform";
import { useNavigation } from "@react-navigation/native";
export default function DoPartyButton(props) {
  const navigation = useNavigation();
  function onPress(params) {
    navigation.navigate("PartyCreationScreen");
  }
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="add-circle" size={40} color={colors.accentColor} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>make a party</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {},
  iconContainer: {
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: isAndroid ? "white" : "rgba(0, 0, 0, 0.7)",
  },
  icon: {},
  textContainer: {
    marginTop: 10,
  },
  textStyle: {
    fontFamily: "WorkSans-Bold",
    color: colors.iconColor,
    fontSize: 15,
    opacity: 0.8,
  },
});
