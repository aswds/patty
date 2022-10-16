import { signOut } from "firebase/auth";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { auth } from "../../../firebase";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={() => signOut(auth)}>
        <Text>Hello</Text>
      </TouchableOpacity>
    </View>
  );
}
