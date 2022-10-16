import {
  StyleSheet,
  Keyboard,
  ImageBackground,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

export const Screen = (props) => {
  return (
    <ImageBackground
      source={require("../../../../../assets/AE/SignUpBckgr.png")}
      style={styles.container}
      blurRadius={9}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {props.children}
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
    flex: 1,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
