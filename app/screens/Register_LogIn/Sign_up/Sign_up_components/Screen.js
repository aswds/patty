import {
  StyleSheet,
  Keyboard,
  ImageBackground,
  TouchableWithoutFeedback,
  ScrollView,
  View,
  KeyboardAvoidingView,
} from "react-native";

export const Screen = (props) => {
  return (
    <ImageBackground
      source={require("../../../../../assets/AE/SignUpBckgr.png")}
      style={styles.container}
      blurRadius={9}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* <View style={styles.viewStyle}> */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.viewStyle}
          >
            {props.children}
          </KeyboardAvoidingView>
          {/* </View> */}
        </ScrollView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  scrollViewContainer: {
    flexGrow: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  viewStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "10%",
  },
  keyboardAvoidingViewStyle: {
    flex: 1,
    width: null,
    height: null,
  },
});
