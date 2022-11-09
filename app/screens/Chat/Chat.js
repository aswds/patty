import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { auth } from "../../../firebase";

export default function Chat() {
  const signOut = () => {
    auth.signOut();
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text onPress={signOut}>Chat Screen</Text>
    </View>
  );
}
