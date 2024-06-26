import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { FontFamily } from "../../../assets/fonts/Fonts";
import { colors } from "../../src/colors";

interface ChoiceButton<T extends string> {
  isSelected: boolean;
  buttonsText: T;
  handleButton: (button: T) => void;
  style?: ViewStyle;
}

function ChoiceButton<T extends string>({
  isSelected,
  buttonsText,
  handleButton,
  style,
}: ChoiceButton<T>) {
  return (
    <TouchableOpacity
      style={[styles.button, isSelected && styles.selectedButton, style]}
      onPress={() => handleButton(buttonsText)}
    >
      <Text
        style={[styles.buttonText, isSelected && styles.selectedButtonText]}
      >
        {buttonsText}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    maxHeight: 50,
    flex: 1,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 99,
    padding: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: colors.accentColor,
    borderColor: colors.accentColor,
  },
  buttonText: {
    fontSize: 16,
    color: "#444",
    fontFamily: FontFamily.bold,
  },
  selectedButtonText: {
    color: "white",
  },
});
export default ChoiceButton;
