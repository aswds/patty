import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
export default function NMNextButton(props) {
  const { styles, navigation, name } = props;
  return (
    <TouchableOpacity
      style={styles.nextButtonContainer}
      onPress={() => {
        navigation.navigate("Avatar", {
          userName: name,
        });
      }}
    >
      <Text style={styles.nextButtonText}>{name ? "Next" : "Skip"}</Text>
      <FontAwesome5 name="arrow-right" size={30} color={"black"} />
    </TouchableOpacity>
  );
}
