import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../src/colors";
import ChoiceButton from "./ChoiseButton";
import { TwoButtonsText } from "./Types/TwoButtonsType";
interface TwoButtonProps<T extends string> {
  onButtonUpdate: (selectedButton: T) => void;
  buttonsText: TwoButtonsText<T>;
  initialValue: T;
}

function TwoButtons<T extends string>({
  onButtonUpdate,
  buttonsText,
  initialValue,
}: TwoButtonProps<T>) {
  const [selectedButton, setSelectedButton] = useState<T>(initialValue);

  const handleButton = (button: T) => {
    setSelectedButton(button);
    onButtonUpdate(button);
    impactAsync(ImpactFeedbackStyle.Light);
  };

  return (
    <View style={styles.container}>
      <ChoiceButton
        handleButton={handleButton}
        buttonsText={buttonsText.button1}
        isSelected={selectedButton === buttonsText.button1}
      />

      <ChoiceButton
        handleButton={handleButton}
        buttonsText={buttonsText.button2}
        isSelected={selectedButton === buttonsText.button2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: colors.accentColor,
    borderColor: colors.accentColor,
  },
  buttonText: {
    fontSize: 16,
    color: "#444",
  },
  selectedButtonText: {
    color: "white",
  },
});

export default TwoButtons;
