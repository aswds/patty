import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { FontFamily } from "../../../assets/fonts/Fonts";
import { colors } from "../../src/colors";

interface ButtonProps {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  text: string;
  textStyled?: TextStyle;
  disabled?: boolean;
}

function Button({ style, onPress, text, textStyled, disabled }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.buttonBG, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.textStyle, textStyled]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonBG: {
    backgroundColor: colors.buttonBG,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 30,
  },
  textStyle: {
    color: colors.buttonText,
    fontFamily: FontFamily.regular,
    fontSize: 13,
  },
});
export default Button;
