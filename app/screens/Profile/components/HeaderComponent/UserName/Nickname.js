import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../../../src/colors";
import BoldText from "../../../../../shared/Text/BoldText";
import { FontFamily } from "../../../../../../assets/fonts/Fonts";

export default function Nickname({ user }) {
  return (
    <View style={styles.usernameStyle}>
      <BoldText textStyles={styles.textStyle} weight="medium">
        @{user.username}
      </BoldText>
    </View>
  );
}

const styles = StyleSheet.create({
  usernameStyle: {
    marginVertical: "1%",
    marginBottom: "4%",
  },
  textStyle: {
    color: colors.iconColor,
    fontSize: 14,
  },
  usernameContainer: {
    width: "70%",
    backgroundColor: "green",
    borderRadius: 0,
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
