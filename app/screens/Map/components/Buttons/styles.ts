import { StyleSheet } from "react-native";
import { colors } from "../../../../src/colors";
import { isAndroid } from "../../../../src/platform";
import { FontFamily } from "../../../../../assets/fonts/Fonts";

export const styles = StyleSheet.create({
  buttonContainer: {
    height: "100%",
    backgroundColor: colors.mapButtons,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  mainButton: { padding: "5%" },
  textStyle: { fontFamily: FontFamily.medium, color: colors.accentColor },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: colors.background,
  },
  additionalButton: {
    aspectRatio: 1,
  },
});
