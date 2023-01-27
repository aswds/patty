import { FontAwesome5 } from "@expo/vector-icons";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../../src/colors";
import { isAndroid } from "../../../src/platform";

export const BackButton = ({ navigation, style }) => {
  return (
    <TouchableOpacity
      style={[styles.arrowContainer, style]}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <FontAwesome5
        name="arrow-left"
        size={isAndroid ? 25 : 30}
        color={colors.buttonTextColor}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  arrowContainer: {
    height: 50,
    aspectRatio: 1,
    position: "absolute",
    zIndex: 1,
    left: isAndroid ? 0 : 15,
    top: 0,
    justifyContent: "center",
    alignItems: "center",
    margin: Platform.OS == "android" ? 10 : 0,
    backgroundColor: colors.accentColor,
    padding: 10,
    borderRadius: 30,
  },
});
