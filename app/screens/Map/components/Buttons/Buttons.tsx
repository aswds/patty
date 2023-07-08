import React from "react";
import DoPartyButton from "./DoPartyButton";
import { StyleSheet, View } from "react-native";
import SearchButton from "./SearchButton";
import SelectedButton from "./SelectedButton";
import LeaveEventButton from "./LeaveEventButton";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

interface ButtonsProps {
  onPressSelectedButton: () => void;
  onPressPartyCreationButton: () => void;
  onPressSearchPartyButton: () => void;
  onPressLeaveEventButton: () => void;
}

const Buttons = ({
  onPressSelectedButton,
  onPressPartyCreationButton,
  onPressSearchPartyButton,
  onPressLeaveEventButton,
}: ButtonsProps) => {
  const { current_user } = useTypedSelector((state) => state.user_state);
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        {current_user?.events?.onEvent && (
          <LeaveEventButton onPress={onPressLeaveEventButton} />
        )}
        <SelectedButton onPress={onPressSelectedButton} />
      </View>

      <DoPartyButton onPress={onPressPartyCreationButton} />
      <SearchButton onPress={onPressSearchPartyButton} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    bottom: "7%",
    right: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    flexWrap: "wrap-reverse",
  },
});
export default Buttons;
