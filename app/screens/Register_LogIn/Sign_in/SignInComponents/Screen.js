import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

export default function Screen(props) {
  const { styles, keyboardDissmis } = props;
  return (
    <ImageBackground
      source={require("../../../../../assets/AE/background-02-01.png")}
      style={{ flex: 1, width: null, height: null }}
      blurRadius={35}
    >
      <SafeAreaView style={styles.linearGradientStyle}>
        <TouchableWithoutFeedback onPress={keyboardDissmis} style={{ flex: 1 }}>
          <ScrollView
            style={styles.container}
            showsHorizontalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              {props.children}
            </KeyboardAvoidingView>
          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </ImageBackground>
  );
}
