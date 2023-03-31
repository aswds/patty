import React, { ForwardedRef, PropsWithChildren } from "react";
import {
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
  StyleProp,
} from "react-native";
import { colors } from "../../../src/colors";
import { FontFamily } from "../../../../assets/fonts/Fonts";

interface InputProps extends PropsWithChildren {
  style: ViewStyle;
  isValid?: boolean;
  icon?: JSX.Element;
  inputStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = React.forwardRef(
  (
    { style, isValid, icon, children, inputStyle, ...props },
    ref: ForwardedRef<TextInput>
  ) => {
    return (
      <View
        style={{
          ...styles.userInput,
          ...style,
          borderWidth: isValid ? 0 : 1,
          borderColor: isValid ? "black" : colors.accentColor,
        }}
      >
        <TextInput
          keyboardAppearance={"dark"}
          style={{
            ...styles.textInput,
            ...inputStyle,
          }}
          autoCapitalize={"none"}
          ref={ref}
          {...props}
        />
        <View style={{ marginHorizontal: 15, position: "absolute", right: 0 }}>
          {icon}
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  userInput: {
    flexDirection: "row",
    backgroundColor: colors.input,
    marginTop: 30,
    width: "85%",
    height: 55,
    justifyContent: "space-between",

    paddingLeft: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  textInput: {
    borderBottomColor: colors.iconColor,
    fontFamily: FontFamily.bold,
    paddingVertical: "5%",
    paddingHorizontal: 10,
    width: "100%",
    color: colors.text,
  },
});
