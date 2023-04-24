import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { colors } from "../../../../../../src/colors";

export const NMScreen = (props) => {
  return (
    <View
      style={{
        flex: 1,
        width: null,
        height: null,
        backgroundColor: colors.background,
      }}
    >
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{
                flex: 1,
                width: null,
                height: null,
              }}
              keyboardShouldPersistTaps="handled"
            >
              {props.children}
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
});
