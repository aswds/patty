import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Title } from "../../../../shared/Title/Title";
import { colors } from "../../../../src/colors";
import * as Haptics from "expo-haptics";
import { Party_Access_Types } from "../../../../Types/Events";
import TwoButtons from "../../../../shared/Buttons/TwoChoiseButtons";
import { TwoButtonsText } from "../../../../shared/Buttons/Types/TwoButtonsType";
import { Ionicons } from "@expo/vector-icons";
import { descriptionTexts } from "../descriptionTexts";
interface Party_AccessProps {
  onParty_AccessUpdate: (party_access: Party_Access_Types) => void;
  party_access: Party_Access_Types;
}

const PartyAccess: React.FC<Party_AccessProps> = ({
  onParty_AccessUpdate,
  party_access,
}) => {
  const handleParty_Access = (value: Party_Access_Types) => {
    onParty_AccessUpdate(value);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  const buttonsText: TwoButtonsText<Party_Access_Types> = {
    button1: "Public",
    button2: "Via Invite",
  };
  return (
    <>
      <Title
        title="Party access"
        description={descriptionTexts.party_access}
        icon={
          <Ionicons
            name={
              party_access === "Public"
                ? "lock-open-outline"
                : "lock-closed-outline"
            }
            size={24}
            color={colors.text}
            style={{ marginHorizontal: 5 }}
          />
        }
      />

      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TwoButtons
            buttonsText={buttonsText}
            onButtonUpdate={handleParty_Access}
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

export default PartyAccess;
