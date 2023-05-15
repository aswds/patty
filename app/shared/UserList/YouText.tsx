import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { FontFamily } from "../../../assets/fonts/Fonts";
import { colors } from "../../src/colors";

export function YouText() {
  return (
    <Text style={[styles.usernameTextStyle, { fontFamily: FontFamily.bold }]}>
      You
    </Text>
  );
}
const styles = StyleSheet.create({
  userNameContainer: {
    maxWidth: "50%",
  },
  usernameTextStyle: {
    fontFamily: FontFamily.regular,
    color: colors.iconColor,
  },
});
