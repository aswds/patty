import React from "react";
import { Text, View } from "react-native";
import { colors } from "../../../../../../src/colors";
import { FontFamily } from "../../../../../../../assets/fonts/Fonts";

export default function NMAskName(props) {
  const { styles } = props;
  return (
    <View
      style={{
        alignSelf: "flex-start",
        flexDirection: "row",
        marginHorizontal: 20,
      }}
    >
      <View>
        <Text style={styles.title}>Hi! 👋</Text>
        <Text
          style={{
            fontFamily: FontFamily.regular,
            fontSize: 17,
            color: colors.iconColor,
          }}
        >
          What's your full name?
        </Text>
      </View>
    </View>
  );
}
