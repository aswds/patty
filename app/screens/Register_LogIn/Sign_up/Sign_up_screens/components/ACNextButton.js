import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../../../../../src/colors";
export default function ACNextButton(props) {
  const { navigation, image, styles, name } = props;
  return (
    <TouchableOpacity
      style={{ ...styles.nextButtonContainer, marginHorizontal: 10 }}
      onPress={() => {
        navigation.navigate("SignUpScreen", {
          userName: name || "",
          userImage: image || "",
        });
      }}
    >
      <Text style={styles.nextButtonText}>{image ? "Next" : "Skip"}</Text>
      <FontAwesome5
        name="arrow-right"
        size={30}
        color={colors.buttonTextColor}
      />
    </TouchableOpacity>
  );
}
