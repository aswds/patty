import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { PartyPlace } from "../../../../Types/Events";
import ChoiceButton from "../../../../shared/Buttons/ChoiseButton";
import { Title } from "../../../../shared/Title/Title";
import { colors } from "../../../../src/colors";
import { descriptionTexts } from "../descriptionTexts";

interface PartyPlaceProps {
  handlePartyPlaceUpdate: (place: PartyPlace) => void;
}

const PartyPlaces: React.FC<PartyPlaceProps> = ({ handlePartyPlaceUpdate }) => {
  const [selectedOption, setSelectedOption] = useState<string>();
  const partyPlaces: Array<PartyPlace> = [
    "House",
    "Restaurant/Bar",
    "Club",
    "Event Space",
    "Beach/Park",
  ];
  const handleOptionSelect = (option: PartyPlace) => {
    setSelectedOption(option);
    handlePartyPlaceUpdate(option);
  };

  const renderOption = (option: PartyPlace, index: number) => {
    const isSelected = option === selectedOption;

    return (
      <ChoiceButton
        buttonsText={option}
        handleButton={handleOptionSelect}
        isSelected={isSelected}
        style={{ flex: 0, marginVertical: 5 }}
        key={index}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Title
        title="Party venue"
        icon={
          <Entypo
            name="location"
            size={25}
            color={colors.text}
            style={{ marginHorizontal: 5 }}
          />
        }
        description={descriptionTexts.party_venue}
      />
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {partyPlaces.map(renderOption)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: "5%",
  },
  container1: {
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  title: {
    fontSize: 24,
    fontFamily: FontFamily.extra_bold,
    marginBottom: 20,
    color: colors.text,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#000",
    marginVertical: 5,
  },
  optionText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  selectedOption: {
    backgroundColor: "#000",
  },
  selectedOptionText: {
    color: "#fff",
  },
});

export default PartyPlaces;
