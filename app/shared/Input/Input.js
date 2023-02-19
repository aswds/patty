import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../../src/colors";

const Input = React.forwardRef(
  ({ style, isValid, icon, children, inputStyle, ...props }, ref) => {
    return (
      <View
        style={{
          ...styles.userInput,
          ...style,
          borderWidth: isValid ? null : 1,
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
    fontFamily: "WorkSans-Bold",
    paddingVertical: "5%",
    paddingHorizontal: 10,
    width: "100%",
    color: colors.text,
  },
});
export default Input;
