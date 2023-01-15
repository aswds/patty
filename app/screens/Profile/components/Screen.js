import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { colors } from "../../../src/colors";
export default function Screen(props) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {props.children}
    </View>
  );
}
