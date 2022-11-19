import { FontAwesome5 } from "@expo/vector-icons";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../../src/colors";
const isAndroid = Platform.OS == "android";

export const BackButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={styles.arrowContainer}
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
    height: isAndroid ? 35 : 50,
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
