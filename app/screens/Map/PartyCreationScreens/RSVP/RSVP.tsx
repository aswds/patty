import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Title } from "../../../../shared/Title/Title";
import { colors } from "../../../../src/colors";
import * as Haptics from "expo-haptics";
import { RSVP_Types } from "../../../../Types/Events";
import TwoButtons from "../../../../shared/Buttons/TwoChoiseButtons";
import { TwoButtonsText } from "../../../../shared/Buttons/Types/TwoButtonsType";
interface RsvpProps {
  onRsvpUpdate: (rsvp: RSVP_Types) => void;
}

const Rsvp: React.FC<RsvpProps> = ({ onRsvpUpdate }) => {
  const handleRsvp = (value: RSVP_Types) => {
    console.log(value);
    onRsvpUpdate(value);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  const buttonsText: TwoButtonsText<RSVP_Types> = {
    button1: "Public",
    button2: "Via Invite",
  };
  return (
    <>
      <Title title="RSVP" description="Private/Public party" />

      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TwoButtons
            buttonsText={buttonsText}
            onButtonUpdate={handleRsvp}
            initialValue={buttonsText.button1}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
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

export default Rsvp;
