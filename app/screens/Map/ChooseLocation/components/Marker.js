import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { View, StyleSheet, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
export default function FakeMarker() {
  const screenHeight = Dimensions.get("screen").height;
  return (
    <View
      style={{
        position: "absolute",
        top: screenHeight / 2.5,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
      pointerEvents="none"
    >
      <MaterialIcons name="location-history" size={45} color="white" />
      {/* <FontAwesome name="map-marker" size={40} color="white" /> */}
    </View>
  );
}
