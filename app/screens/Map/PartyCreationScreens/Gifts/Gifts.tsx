import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import TwoButtons from "../../../../shared/Buttons/TwoChoiseButtons";
import { TwoButtonsText } from "../../../../shared/Buttons/Types/TwoButtonsType";
import { GiftsRequireTextTypes } from "../../../../Types/Events";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { colors } from "../../../../src/colors";
import { Title } from "../../../../shared/Title/Title";
import { Ionicons } from "@expo/vector-icons";

interface GiftsProps {
  onGiftUpdate: (value: GiftsRequireTextTypes) => void;
}

const Gifts: React.FC<GiftsProps> = ({ onGiftUpdate }) => {
  const buttonsText: TwoButtonsText<GiftsRequireTextTypes> = {
    button1: "Required",
    button2: "Not Required",
  };

  return (
    <View style={styles.container}>
      <Title
        title="Gift"
        description=""
        icon={
          <Ionicons
            name="gift"
            size={24}
            color={colors.text}
            style={{ marginHorizontal: 5 }}
          />
        }
      />
      <TwoButtons
        onButtonUpdate={onGiftUpdate}
        buttonsText={buttonsText}
        initialValue={buttonsText.button2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: FontFamily.extra_bold,
    color: colors.text,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "green",
    borderColor: "green",
  },
  buttonText: {
    fontSize: 16,
    color: "#444",
  },
  selectedButtonText: {
    color: "white",
  },
});

export default Gifts;
