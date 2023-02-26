import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { colors } from "../../src/colors";

interface NextButtonProps {
  onPress: () => void;
  style?: ViewStyle;
  isValueEntered?: boolean;
  error?: string | null;
}

export default function NextButton({
  onPress,
  style,
  isValueEntered = true,
  error,
}: NextButtonProps): JSX.Element {
  const colorValue = isValueEntered
    ? colors.buttonTextColor
    : colors.disabledText;
  return (
    <TouchableOpacity
      style={[
        styles.nextButtonContainer,
        style,
        {
          backgroundColor: colors.accentColor,
        },
      ]}
      onPress={() => {
        if (isValueEntered) {
          onPress();
        } else {
          Alert.alert(`Oh no...`, `Please enter ${error}🙃`);
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
    backgroundColor: colors.accentColor,
  },
  nextButtonText: {
    fontWeight: "bold",
  },
});
