import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../src/colors";
import { isAndroid } from "../../src/platform";
import { PropsWithChildren } from "react";
interface ScreenProps extends PropsWithChildren {}
export const ScreenWithoutMapping = ({ children }: ScreenProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={!isAndroid ? "padding" : "height"}
          style={styles.viewStyle}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              flex: 1,
              paddingTop: insets.top,
            }}
            contentContainerStyle={styles.scrollViewContainer}
          >
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  viewStyle: {
    flex: 1,
  },
  keyboardAvoidingViewStyle: {
    flex: 1,
  },
});
