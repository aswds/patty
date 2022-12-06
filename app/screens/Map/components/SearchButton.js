import React from "react";
import { Callout } from "react-native-maps";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Animated,
} from "react-native";
import {
  FontAwesome,
  AntDesign,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { colors } from "../../../src/colors";
import { isAndroid } from "../../../src/platform";
export default function SearchButton(props) {
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
        name="search-location"
        size={"30%"}
        color={isFocused ? colors.mapAccentColor : "grey"}
      />
    </TouchableOpacity>
  );
}
