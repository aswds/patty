import {Feather} from "@expo/vector-icons";
import React from "react";
import {Alert, TouchableOpacity} from "react-native";
import {auth} from "../../../../../firebase";

export default function LogOutButton() {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "rgba(21, 21, 21, 0.6)",
        borderRadius: 25,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: "5%",
        top: "-5%",
      }}
      onPress={() => {
        Alert.alert("Logout", "Are you sure?", [
          {
            text: "No",
            style: "cancel",
            onPress: () => {},
          },
          {
            text: "Yes",
            style: "destructive",
            onPress: () => {
              auth.signOut();
            },
          },
        ]);
      }}
    >
      <Feather
        name="log-out"
        size={24}
        color="red"
        style={{ transform: [{ rotate: "180deg" }] }}
      />
    </TouchableOpacity>
  );
}
