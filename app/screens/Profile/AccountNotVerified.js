import React from "react";
import { View, Text } from "react-native";

export default function AccountNotVerified({ isVerified }) {
  if (isVerified) {
    return;
  }
  return (
    <View
      style={{
        backgroundColor: "yellow",
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        paddingVertical: 5,
        justifyContent: "center",
        alignItems: "center",
        zIndex: -10,
      }}
    >
      <Text> Your accaunt is not activated</Text>
    </View>
  );
}
