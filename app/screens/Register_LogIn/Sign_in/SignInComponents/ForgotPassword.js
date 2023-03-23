import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function ForgotPassword({ navigation, styles }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("DataRecovery");
      }}
      style={styles.forgotPasswordContainer}
    >
      <Text style={styles.forgotPasswordTextStyle}>Forgot a password ?</Text>
    </TouchableOpacity>
  );
}
