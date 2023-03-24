import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function ForgotPassword({ navigation, styles }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Recovery");
      }}
      style={styles.forgotPasswordContainer}
    >
      <Text style={styles.forgotPasswordTextStyle}>Forgot password?</Text>
    </TouchableOpacity>
  );
}
