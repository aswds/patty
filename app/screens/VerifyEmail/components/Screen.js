import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { colors } from "../../../src/colors";

const Screen = ({ children }) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardContainer}
        >
          {children}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: colors.background,
  },
});
export default Screen;
