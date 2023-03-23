import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../../../src/colors";
import { FontFamily } from "../../../../../../assets/fonts/Fonts";

export default function Verify({ email }) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: Dimensions.get("window").height * 0.2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          maxWidth: "80%",
          alignItems: "center",
          textAlign: "center",
          fontFamily: FontFamily.medium,
          color: colors.iconColor,
          fontSize: 13,
        }}
      >
        If you think you spelled it wrong change it{" "}
        <TouchableOpacity
          onPress={() => navigation.navigate("ChangeEmail", { email })}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: FontFamily.medium,
              color: colors.accentColor,
              fontSize: 13,
            }}
          >
            here
          </Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
}
