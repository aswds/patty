import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  View,
  Image,
} from "react-native";
import { colors } from "../../../../src/colors";

const size = {
  height: Dimensions.get("window").height * 0.2,
  width: Dimensions.get("window").height * 0.2,
};

export default function Screen(props) {
  const { styles, keyboardDissmis } = props;
  return (
    <View
      style={{
        flex: 1,
        width: null,
        height: null,
        backgroundColor: "#202020",
      }}
    >
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={keyboardDissmis} style={{ flex: 1 }}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={{
              ...styles.container,
            }}
            showsHorizontalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <KeyboardAvoidingView
              style={{
                flex: 1,
                marginTop: "20%",
                justifyContent: "flex-start",
              }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              {props.children}
            </KeyboardAvoidingView>
          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
  );
}
