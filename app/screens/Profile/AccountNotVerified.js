import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../src/colors";
import { useNavigation } from "@react-navigation/native";

export default function AccountNotVerified({ isVerified }) {
  const navigation = useNavigation();
  if (isVerified) {
    return;
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textTermsStyle}>
          Your account is not activated.{" "}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("VerifyEmail");
          }}
        >
          <Text
            style={{
              ...styles.textTermsStyle,
              color: colors.blue_text,
            }}
          >
            Activate
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "yellow",
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -10,
  },
  textContainer: {
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  textStyles: {
    textStyle: {
      fontFamily: "WorkSans-Medium",
      backgroundColor: "green",
    },
    activateStyle: {
      fontFamily: "WorkSans-Bold",
      color: colors.blue_text,
    },
  },
});
