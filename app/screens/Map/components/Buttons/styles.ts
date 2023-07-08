import { StyleSheet } from "react-native";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { colors } from "../../../../src/colors";

export const styles = StyleSheet.create({
  buttonContainer: {
    height: 65,
    backgroundColor: colors.mapButtons,
    borderRadius: 20,
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
