import React from "react";
import { View, ActivityIndicator } from "react-native";
export default function Loader() {
  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.7,
        backgroundColor: "#151515",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={"small"} color={"white"} />
    </View>
  );
}
container: {
}
