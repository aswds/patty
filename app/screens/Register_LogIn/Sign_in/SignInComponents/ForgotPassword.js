import React from "react";
import { TouchableOpacity, Text } from "react-native";
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
