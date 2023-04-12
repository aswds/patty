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
export const Screen = ({ children }: ScreenProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container} testID="screen">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
          }}
          contentContainerStyle={[
            styles.scrollViewContainer,
            {
              paddingTop: insets.top,
            },
          ]}
          showsHorizontalScrollIndicator={false}
        >
          {React.Children.map(children, (children) => (
            <View style={{ marginBottom: "5%" }} pointerEvents="auto">
              {children}
            </View>
          ))}
        </ScrollView>
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
    alignItems: "center",
    padding: 20,
  },
  viewStyle: {
    flex: 1,
  },
  keyboardAvoidingViewStyle: {
    flex: 1,
  },
});
