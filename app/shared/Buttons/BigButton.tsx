import { PropsWithChildren } from "react";
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { colors } from "../../src/colors";
import { FontFamily } from "../../../assets/fonts/Fonts";

interface ButtonProps extends PropsWithChildren, TouchableOpacityProps {
  textStyle?: TextStyle;
  style?: StyleProp<ViewStyle>;
  title?: string;
  textProps?: TextProps;
}

const Button = ({
  textStyle,
  style,
  children,
  title,
  textProps,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.7}
      style={[styles.container, style]}
    >
      <Text style={[textStyle, styles.defaultTextStyle]} {...textProps}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width / 1.5,
    height: 60,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: colors.accentColor,
    borderWidth: 0,
  },
  defaultTextStyle: {
    color: colors.buttonTextColor,
    fontFamily: FontFamily.bold,
  },
  linearGradient: {
    flex: 1,
  },
});
export default Button;
