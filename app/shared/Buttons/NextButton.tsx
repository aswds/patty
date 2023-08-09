import { FontAwesome5 } from "@expo/vector-icons";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { colors } from "../../src/colors";

interface NextButtonProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  containsProfane?: boolean;
  isValueEntered?: boolean;
  handleErrorMessage: (title: string, message: string) => void;
  error: {
    title: string;
    message: string;
  };
}

export default function NextButton({
  onPress,
  style,
  containsProfane,
  isValueEntered,
  handleErrorMessage,
  error,
}: NextButtonProps): JSX.Element {
  const colorValue =
    isValueEntered && !containsProfane
      ? colors.buttonTextColor
      : colors.disabledText;
  return (
    <TouchableOpacity
      style={[
        styles.nextButtonContainer,
        style,
        {
          backgroundColor:
            isValueEntered && !containsProfane
              ? colors.accentColor
              : colors.disabledButton,
        },
      ]}
      onPress={() => {
        if (isValueEntered && !containsProfane) {
          onPress();
        } else if (containsProfane) {
          handleErrorMessage!(
            `🚫`,
            `Oops! No bad words allowed here. Let's keep it clean!`
          );
        } else {
          handleErrorMessage!(error?.title, error?.message);
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
    marginTop: "10%",
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
