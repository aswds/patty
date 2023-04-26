import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../../../../../src/colors";
import { isProfane } from "../../../../../../services/text_modifier";

export default function NextButton(props) {
  const {
    navigation,
    name,
    disabled,
    surname,
    username,
    errorMsg,
    handleErrorMessage,
  } = props;

  const isValueEntered = name && surname && !disabled && username.length > 3;
  const colorValue =
    isValueEntered && !isProfane(username)
      ? colors.buttonTextColor
      : colors.disabledText;
  return (
    <TouchableOpacity
      style={[
        styles.nextButtonContainer,
        {
          backgroundColor:
            isValueEntered && !isProfane(username)
              ? colors.accentColor
              : colors.disabledButton,
        },
      ]}
      onPress={() => {
        if (isValueEntered && !isProfane(username)) {
          navigation.navigate("Avatar", {
            name,
            surname,
            username,
          });
        } else if (isProfane(username)) {
          handleErrorMessage(
            `🚫`,
            `Oops! No bad words allowed here. Let's keep it clean!`
          );
        } else {
          handleErrorMessage(`Oops!`, `${errorMsg}🙃`);
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
  },
  nextButtonText: {
    fontWeight: "bold",
  },
});
