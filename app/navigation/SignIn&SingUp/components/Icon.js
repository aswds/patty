import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, View, Text, Animated, Dimensions } from "react-native";
import * as Haptics from "expo-haptics";
export default function Icon({ Icon, icon_name, focused, title }) {
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const color = focused ? "rgb(210, 4, 45)" : "black";
  const isMap = title === "Map";
  const DimensionWidth = Dimensions.get("window").width;
  return (
    <View
      style={[
        styles.container,
        {
          height: isMap ? DimensionWidth * 0.15 : DimensionWidth * 0.14,
          marginBottom: isMap ? 10 : 0,
        },
      ]}
    >
      <Icon name={icon_name} size={title == "Map" ? 35 : 25} color={color} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 100,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
