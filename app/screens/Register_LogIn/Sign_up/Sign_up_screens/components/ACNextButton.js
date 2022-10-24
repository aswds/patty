import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
export default function ACNextButton(props) {
  const { navigation, image, styles, name } = props;
  return (
    <TouchableOpacity
      style={styles.nextButtonContainer}
      onPress={() => {
        navigation.navigate("SignUpScreen", {
          userName: name || "",
          userImage: image || "",
        });
      }}
    >
      <Text style={styles.nextButtonText}>{image ? "Next" : "Skip"}</Text>
      <FontAwesome5 name="arrow-right" size={30} color={"black"} />
    </TouchableOpacity>
  );
}
