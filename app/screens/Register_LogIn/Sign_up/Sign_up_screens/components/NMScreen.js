import {
  ImageBackground,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { colors } from "../../../../../src/colors";
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
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss();
              }}
            >
              <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                  style={{ flex: 1 }}
                  contentContainerStyle={{
                    flex: 1,
                    width: null,
                    height: null,
                  }}
                >
                  {props.children}
                </ScrollView>
              </SafeAreaView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
});
