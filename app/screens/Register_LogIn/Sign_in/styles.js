import { Dimensions, Platform, StyleSheet } from "react-native";
import { colors } from "../../../src/colors";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  styledButtonStyle: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "rgba(155 , 50, 50 , 1)",
    flex: 1,
  },
  styledButtonTextStyle: {
    fontFamily: "Nunito-Bold",
    fontSize: 20,
    color: "#E7E0C9",
  },
  forgotPasswordContainer: { alignSelf: "flex-end", paddingVertical: 10 },
  forgotPasswordTextStyle: { color: "#416194", fontSize: 13 },
  logoContainer: {
    height:
      Platform.OS === "android"
        ? Dimensions.get("window").height * 0.25
        : Dimensions.get("window").height * 0.2,
    alignItems: "center",
  },
  registerContainer: {
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  errorMsg: {
    color: "red",
  },
  loginContainer: {
    width: Dimensions.get("window").width / 1,
    height: Dimensions.get("window").height * 0.25,
    alignItems: "center",
    justifyContent: "center",
  },

  textContainer: {
    alignItems: "center",
    paddingBottom: 20,
    marginBottom: 30,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    fontVariant: ["small-caps"],
  },
  imageStyle: {
    flex: 1,
    overflow: "hidden",
  },
  innerText: {
    alignItems: "center",
  },
  textStyle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  userInput: {
    flexDirection: "row",
    backgroundColor: colors.input,
    marginTop: 30,
    width: "85%",
    height: 55,
    justifyContent: "space-between",

    paddingLeft: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  inputField: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: "center",
  },
  linearGradientStyle: {
    flex: 1,
  },
  imageContainer: {
    height: 90,
    width: 90,
    shadowOpacity: 0.4,
    shadowOffset: { height: 2, width: 0 },
  },
  animationStyle: {
    alignItems: "flex-start",
    width: Dimensions.get("window").width / 1.6,
    height: 20,
    marginVertical: 5,
  },
  styledButtonContainer: {
    marginTop: "10%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 10,
    alignSelf: "center",
    paddingVertical: 30,
    width: "85%",
  },
  styledButton: {
    height: 50,
    marginTop: 20,
    backgroundColor: "grey",
    borderRadius: 10,
  },
});
