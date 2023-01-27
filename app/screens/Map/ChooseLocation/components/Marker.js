import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions, View } from "react-native";
import { isAndroid } from "../../../../src/platform";

export default function FakeMarker() {
  const screenHeight = Dimensions.get("screen").height;
  const iconSize = 45;
  return (
    <View
      style={{
        position: "absolute",
        top: isAndroid ? "50%" + iconSize / 2 : screenHeight / 2.5,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
      pointerEvents="none"
    >
      <MaterialIcons name="location-history" size={iconSize} color="white" />
    </View>
  );
}
