import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../../../../../src/colors";

export default function NMNextButton(props) {
  const { navigation, name, surname } = props;
  const isValueEntered = name && surname;
  const colorValue = isValueEntered
    ? colors.buttonTextColor
    : colors.disabledText;
  return (
    <TouchableOpacity
      style={[
        styles.nextButtonContainer,
        {
          backgroundColor: isValueEntered
            ? colors.accentColor
            : colors.disabledButton,
        },
      ]}
      onPress={() => {
        if (isValueEntered) {
          navigation.navigate("Username", {
            name,
            surname,
          });
        } else {
          Alert.alert(
            `Please, enter your full name`,
            `You'll use it to meet new people 🙃`
          );
        }
      }}
    >
      <Text
        style={[
          styles.nextButtonText,
          {
            color: colorValue,
          },
        ]}
      >
        Next
      </Text>
      <FontAwesome5 name="arrow-right" size={30} color={colorValue} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  nextButtonContainer: {
    width: "35%",
    position: "absolute",
    bottom: 10,
    right: 0,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    padding: 10,
    borderRadius: 40,
    marginHorizontal: 10,
  },
  nextButtonText: {
    fontWeight: "bold",
  },
});
