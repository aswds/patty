import React from "react";
import { View, Text } from "react-native";
export default function VerifyText({ styles, text }) {
  return (
    <View>
      <Text style={styles.textStyle}>
        {text ? text : "To countinue, verify your email"}
      </Text>
    </View>
  );
}
