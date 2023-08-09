import React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../../../../../../src/colors";

export default function ACNextButton(props) {
  const { navigation, image, styles, name, surname, username } = props;
  return (
    <SafeAreaView style={{ width: "100%" }}>
      <TouchableOpacity
        style={{ ...styles.nextButtonContainer, marginHorizontal: 10 }}
        onPress={() => {
          if (name && surname && username) {
            navigation.navigate("SignUpScreen", {
              name: name,
              surname: surname,
              username: username,
              imageURI: image || "",
            });
          }
        }}
      >
        <Text style={styles.nextButtonText}>{image ? "Next" : "Skip"}</Text>
        <FontAwesome5
          name="arrow-right"
          size={30}
          color={colors.buttonTextColor}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
