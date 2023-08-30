import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../src/colors";
import BoldText from "../../shared/Text/BoldText";
import { AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function InternetConnection() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        backgroundColor: colors.background,
        position: "absolute",
        zIndex: 1,
        left: 0,
        right: 0,
        width: "100%",
        height: "10%",
        bottom: insets.bottom,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <AntDesign name="disconnect" size={24} color={colors.accentColor} />

      <BoldText textStyles={{ fontSize: 24, marginHorizontal: 5 }}>
        Disconnected
      </BoldText>
    </View>
  );
}

const styles = StyleSheet.create({});
