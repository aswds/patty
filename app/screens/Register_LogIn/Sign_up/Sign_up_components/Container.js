import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Platform,
  Dimensions,
} from "react-native";
import { isAndroid } from "../../../../src/platform";
export const Container = (props) => {
  return (
    <View style={styles.registerContainer}>
      <View style={styles.innerStyle}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    marginBottom: isAndroid ? 0 : "5%",
    height: isAndroid ? null : Dimensions.get("window").height / 2.2,
    width: "80%",
    justifyContent: "center",
  },
  innerStyle: {
    alignItems: "center",
    marginVertical: isAndroid ? "5%" : 0,
  },
});
