import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { colors } from "../../../../src/colors";
import { isAndroid } from "../../../../src/platform";

export default function FakeMarker() {
  const iconSize = 45;
  // top: isAndroid ? "50%" + iconSize / 2 : screenHeight / 2.5,
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: isAndroid ? iconSize / 2 + 10 : iconSize / 2,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
      pointerEvents="none"
    >
      <MaterialIcons
        name="location-on"
        size={iconSize}
        color={colors.accentColor}
        style={{}}
      />
    </View>
  );
}
