import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, TouchableOpacity } from "react-native";
export default function EditButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "rgba(21, 21, 21, 0.6)",
        borderRadius: 25,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: "5%",
        top: "-5%",
      }}
      onPress={() => {
        navigation.navigate("EditProfile");
      }}
    >
      <Feather name="edit-2" size={20} color="white" />
    </TouchableOpacity>
  );
}
