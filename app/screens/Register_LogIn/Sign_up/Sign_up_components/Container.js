import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Platform,
  Dimensions,
} from "react-native";
export const Container = (props) => {
  return (
    <View style={styles.registerContainer}>
      <View style={styles.innerText}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    marginTop: "5%",
    marginBottom: "5%",
    height: Dimensions.get("window").height * 0.5,
    // height: Dimensions.get("window").height / 2.2,
    width: Dimensions.get("window").width / 1.3,
    justifyContent: "center",
  },
  innerText: {
    alignItems: "center",
  },
});
