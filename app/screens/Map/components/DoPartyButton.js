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
import { FontAwesome5 } from "@expo/vector-icons";
const isAndroid = Platform.OS == "android";

export default function DoPartyButton(props) {
  const { onPress, isFocused, styles } = props;
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: isFocused ? "rgba(255, 255, 255, 1)" : null },
      ]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <FontAwesome5
        name="fire-alt"
        size={"30%"}
        color={isFocused ? colors.mapAccentColor : "grey"}
      />
    </TouchableOpacity>
  );
}
