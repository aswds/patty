import React, { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PartyPlace } from "../../../../Types/Events";
import ChoiseButton from "../../../../shared/Buttons/ChoiseButton";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { colors } from "../../../../src/colors";
import { Title } from "../../../../shared/Title/Title";

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
      <ChoiseButton
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
      <Title title="Specify a location" />
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
