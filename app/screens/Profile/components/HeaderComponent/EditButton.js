import { Feather } from "@expo/vector-icons";
import React from "react";
import { View, TouchableOpacity } from "react-native";
export default function EditButton() {
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
    >
      <Feather name="edit-2" size={20} color="white" />
    </TouchableOpacity>
  );
}
