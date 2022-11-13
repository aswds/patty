import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { colors } from "../../../../src/colors";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
export default function Buttons(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button1}
        onPress={() => {
          navigation.navigate("SignUpScreen");
        }}
      >
        <Text style={styles.textStyle}>Sign up</Text>
        <View style={{ marginLeft: 20 }}>
          <Ionicons
            name="ios-arrow-forward-circle-sharp"
            size={25}
            color="white"
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button2}
        onPress={() => {
          navigation.navigate("SignInScreen");
        }}
      >
        <Text style={styles.textStyle}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button1: {
    height: 45,
    width: "50%",
    backgroundColor: colors.accentColor,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  button2: {
    height: 45,
    marginTop: "10%",
    width: "50%",
    backgroundColor: "#363636",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "white",
    fontFamily: "WorkSans-SemiBold",
  },
});
