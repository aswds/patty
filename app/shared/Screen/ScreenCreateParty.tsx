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
  navigationBar?: React.ReactNode;
}
export const ScreenCreateParty = ({
  children,
  createPartyButton,
  containerStyle,
  keyboardOffset,
  navigationBar,
}: ScreenProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container} testID="screen">
      <KeyboardAvoidingView
        behavior={!isAndroid ? "padding" : "height"}
        style={styles.viewStyle}
        keyboardVerticalOffset={keyboardOffset}
      >
        {navigationBar}

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
          }}
          contentContainerStyle={[
            styles.scrollViewContainer,
            {
              paddingTop: "5%",
            },
            containerStyle,
          ]}
          showsHorizontalScrollIndicator={false}
          pointerEvents="auto"
          keyboardShouldPersistTaps="handled"
        >
          {React.Children.map(children, (children) => (
            <View style={{ marginBottom: "5%" }}>{children}</View>
          ))}
          {createPartyButton}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  scrollViewContainer: {},
  viewStyle: {
    flex: 1,
    backgroundColor: "transparent",
  },
  keyboardAvoidingViewStyle: {
    flex: 1,
  },
});
