import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../src/colors";
import { isAndroid } from "../../src/platform";
import { PropsWithChildren } from "react";
interface ScreenProps extends PropsWithChildren {
  style?: ViewStyle;
  navigationBar?: React.ReactNode;
}
export const Screen = ({ children, style, navigationBar }: ScreenProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
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
          contentContainerStyle={[styles.scrollViewContainer, style]}
          pointerEvents="auto"
          keyboardShouldPersistTaps="handled"
        >
          {navigationBar}
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  viewStyle: {
    flex: 1,
  },
  keyboardAvoidingViewStyle: {
    flex: 1,
  },
});
