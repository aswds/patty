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
  createPartyButton?: React.ReactNode;
  containerStyle?: ViewStyle;
  keyboardOffset?: number;
}
export const ScreenCreateParty = ({
  children,
  createPartyButton,
  containerStyle,
  keyboardOffset,
}: ScreenProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container} testID="screen">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={!isAndroid ? "padding" : "height"}
          style={styles.viewStyle}
          keyboardVerticalOffset={keyboardOffset}
        >
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
              containerStyle,
            ]}
            showsHorizontalScrollIndicator={false}
          >
            {React.Children.map(children, (children) => (
              <View style={{ marginBottom: "5%" }} pointerEvents="auto">
                {children}
              </View>
            ))}
            {createPartyButton}
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollViewContainer: {
    padding: 20,
  },
  viewStyle: {
    flex: 1,
  },
  keyboardAvoidingViewStyle: {
    flex: 1,
  },
});
