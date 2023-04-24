import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../../src/colors";

export const Screen = (props) => {
  const insets = useSafeAreaInsets();
  const styles = makeStyles(insets);
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.viewStyle}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            paddingTop: insets.top,
          }}
          contentContainerStyle={styles.scrollViewContainer}
          keyboardShouldPersistTaps="handled"
        >
          {props.children}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
const makeStyles = (insets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: colors.background,
    },
    scrollViewContainer: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    viewStyle: {
      flex: 1,
      justifyContent: "center",
    },
    keyboardAvoidingViewStyle: {
      flex: 1,
    },
  });
