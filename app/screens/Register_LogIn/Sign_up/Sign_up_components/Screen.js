import {
  StyleSheet,
  Keyboard,
  ImageBackground,
  TouchableWithoutFeedback,
  ScrollView,
  View,
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
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <View style={styles.viewStyle}>{props.children}</View>
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
    flexGrow: 1,
  },
  viewStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "10%",
  },
});
