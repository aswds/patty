import {
  ImageBackground,
  TouchableWithoutFeedback,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
export const NMScreen = (props) => {
  return (
    <ImageBackground
      source={require("../../../../../../assets/AE/NameInfo-01.png")}
      style={{ flex: 1, width: null, height: null }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <StatusBar barStyle={"dark-content"} />
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
                  contentContainerStyle={{ flex: 1, width: null, height: null }}
                >
                  {props.children}
                </ScrollView>
              </SafeAreaView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
});
