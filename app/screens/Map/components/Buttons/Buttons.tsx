import React from "react";
import DoPartyButton from "./DoPartyButton";
import { StyleSheet, View } from "react-native";
import SearchButton from "./SearchButton";
import SelectedButton from "./SelectedButton";

interface ButtonsProps {
  onPressSelectedButton: () => void;
  onPressPartyCreationButton: () => void;
  onPressSearchPartyButton: () => void;
}

const Buttons = ({
  onPressSelectedButton,
  onPressPartyCreationButton,
  onPressSearchPartyButton,
}: ButtonsProps) => {
  return (
    <View style={styles.container}>
      <SelectedButton onPress={onPressSelectedButton} />
      <DoPartyButton onPress={onPressPartyCreationButton} />
      <SearchButton onPress={onPressSearchPartyButton} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
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
