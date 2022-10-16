import React from "react";
import {
  View,
  TextInput,
  Dimensions,
  ViewProps,
  StyleSheet,
} from "react-native";
import { styles } from "../styles";

export const Input = (props, { style }) => {
  return (
    <View
      style={{
        ...styles.userInput,
        ...props.style,
        borderWidth: props.isValid ? null : 1,
        borderColor: props.isValid ? "black" : "red",
      }}
    >
      {props.children}
      <View style={{ marginHorizontal: 15, position: "absolute", right: 0 }}>
        {props.icon}
      </View>
    </View>
  );
};
