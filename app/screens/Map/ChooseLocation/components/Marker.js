import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FakeMarker() {
  const iconSize = 45;
  const insets = useSafeAreaInsets();
  // top: isAndroid ? "50%" + iconSize / 2 : screenHeight / 2.5,
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: insets.bottom,
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
