import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { colors } from "../../../../../../src/colors";
export default function NextButton(props) {
  const { navigation, name, disabled, surname, username, errorMsg } = props;

  const isValueEntered = name && surname && !disabled && username.length > 3;
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
          navigation.navigate("Avatar", {
            name,
            surname,
            username,
          });
        } else {
          Alert.alert(`Oh no...`, `${errorMsg}🙃`);
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
