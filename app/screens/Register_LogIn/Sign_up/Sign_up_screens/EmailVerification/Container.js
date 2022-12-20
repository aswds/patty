import React from "react";
import {
  Keyboard,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { colors } from "../../../../../src/colors";
import { isAndroid } from "../../../../../src/platform";

export default function Container(props) {
  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.background,
          }}
          behavior={isAndroid ? null : "padding"}
        >
          {props.children}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}
