import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import BoldText from "../../../../shared/Text/BoldText";
import { colors } from "../../../../src/colors";
const LeaveEventButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons
        name="exit"
        size={25}
        color={colors.buttonText}
        style={styles.icon}
      />
      <BoldText textStyles={styles.textStyle}>Leave</BoldText>
    </TouchableOpacity>
  );
};

export default LeaveEventButton;

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    padding: 5,
    right: 0,
    borderColor: colors.accentColor,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.buttonBG,
    borderWidth: 2,
    marginBottom: "20%",
  },
  textStyle: { color: colors.buttonText },
  icon: {
    left: "5%",
  },
});
