import React, { PropsWithChildren } from "react";
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../../../src/colors";

interface ButtonProps extends PropsWithChildren, TouchableOpacityProps {
  textStyle?: TextStyle;
  style?: StyleProp<ViewStyle>;
  title?: string;
}

const Button = ({
  textStyle,
  style,
  children,
  title,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.7}
      style={[styles.container, style]}
    >
      <View style={{ justifyContent: "center" }}>
        <Text style={{ ...textStyle, color: colors.buttonTextColor }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width / 1.5,
    height: Dimensions.get("window").height / 17,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: colors.accentColor,
    borderWidth: 0,
  },
  linearGradient: {
    flex: 1,
  },
});
export default Button;
