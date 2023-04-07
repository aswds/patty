import { Dimensions, StyleSheet, View } from "react-native";
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
    flex: 1,
    width: "80%",
    justifyContent: "center",
  },
  innerStyle: {
    backgroundColor: "yellow",
    alignItems: "center",
  },
});
