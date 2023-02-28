import React from "react";
import DoPartyButton from "./DoPartyButton";
import { StyleSheet, View } from "react-native";
import SearchButton from "./SearchButton";
import SelectedButton from "./SelectedButton";

interface ButtonsProps {
  onPressMoreButton: () => void;
  onPressPartyCreationButton: () => void;
  onPressSearchPartyButton: () => void;
}

const Buttons = ({
  onPressMoreButton,
  onPressPartyCreationButton,
  onPressSearchPartyButton,
}: ButtonsProps) => {
  return (
    <View style={styles.container}>
      <SelectedButton onPress={onPressMoreButton} />
      <DoPartyButton onPress={onPressPartyCreationButton} />
      <SearchButton onPress={onPressSearchPartyButton} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: "7%",
    width: "100%",
    flexDirection: "row",
    position: "absolute",
    bottom: "7%",
    right: 0,
    left: 0,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
export default Buttons;
