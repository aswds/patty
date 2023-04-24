import React from "react";

import { ActivityIndicator, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../src/colors";
import { FontFamily } from "../../../assets/fonts/Fonts";

type LocationLoaderProps = {
  isLoading: boolean;
};
const LocationLoader = ({ isLoading }: LocationLoaderProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        position: "absolute",
        zIndex: 1,
        left: 0,
        right: 0,
        alignItems: "center",
        justifyContent: "center",
        bottom: "20%",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          backgroundColor: "rgba(20, 20 , 20, 0.7)",
          flexDirection: "row",
          padding: 10,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text
          style={{ color: colors.accentColor, fontFamily: FontFamily.bold }}
        >
          Loading location
        </Text>
        <ActivityIndicator
          color={colors.accentColor}
          size={"small"}
          style={{ marginHorizontal: 10 }}
        />
      </View>
    </View>
  );
};

export default LocationLoader;
