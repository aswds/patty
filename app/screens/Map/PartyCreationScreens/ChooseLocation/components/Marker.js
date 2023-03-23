import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { colors } from "../../../../../src/colors";
import { isAndroid } from "../../../../../src/platform";

export default function FakeMarker() {
  let iconSize = 45;
  // top: isAndroid ? "50%" + iconSize / 2 : screenHeight / 2.5,
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: isAndroid ? iconSize / 2 + 10 : iconSize / 1.5,
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
        onLayout={(event) => {
          console.log(event.nativeEvent.layout.height);
        }}
      />
    </View>
  );
}
