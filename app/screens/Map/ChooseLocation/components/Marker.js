import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";

export default function FakeMarker() {
  const iconSize = 45;
  // top: isAndroid ? "50%" + iconSize / 2 : screenHeight / 2.5,
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: iconSize / 2,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
      pointerEvents="none"
    >
      <MaterialIcons
        name="location-history"
        size={iconSize}
        color="white"
        style={{}}
      />
    </View>
  );
}
