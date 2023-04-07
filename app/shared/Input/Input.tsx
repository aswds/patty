import React, { ForwardedRef, PropsWithChildren } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../../src/colors";
import { FontFamily } from "../../../assets/fonts/Fonts";

interface InputProps extends PropsWithChildren, TextInputProps {
  style?: ViewStyle;
  isValid?: boolean;
  icon?: React.ReactNode;
  inputStyle?: TextStyle;
}

const Input = React.forwardRef(
  (
    { style, isValid, icon, children, inputStyle, ...props }: InputProps,
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
          style={[styles.textInput, inputStyle]}
          placeholderTextColor={"grey"}
          autoCapitalize={"none"}
          autoCorrect={false}
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
export default Input;
