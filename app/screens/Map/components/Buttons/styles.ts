import { StyleSheet } from "react-native";
import { colors } from "../../../../src/colors";
import { isAndroid } from "../../../../src/platform";
import { FontFamily } from "../../../../../assets/fonts/Fonts";

export const styles = StyleSheet.create({
  buttonContainer: {
    height: "100%",
    backgroundColor: colors.input,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  mainButton: { padding: "5%" },
  textStyle: { fontFamily: FontFamily.medium, color: colors.accentColor },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: colors.background,
    shadowColor: isAndroid ? "white" : "rgba(0, 0, 0, 0.7)",
  },
  additionalButton: {
    aspectRatio: 1,
  },
});
