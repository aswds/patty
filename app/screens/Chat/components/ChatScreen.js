import React from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { colors } from "../../../src/colors";

const ChatScreen = ({ children }) => {
  return (
    <View style={[styles.container]}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        {children}
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    width: null,
    height: null,
    backgroundColor: colors.background,
  },
});
export default ChatScreen;
