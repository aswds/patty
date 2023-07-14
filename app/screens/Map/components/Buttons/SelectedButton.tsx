import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { colors } from "../../../../src/colors";
import { styles } from "./styles";

interface SelectedButtonProps {
  onPress: () => void;
}
const SelectedButton = ({ onPress }: SelectedButtonProps) => {
  const onEvent = useTypedSelector(
    (state) => state.user_state.current_user.events?.onEvent
  );
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, styles.additionalButton]}
      onPress={onPress}
    >
      <AntDesign
        name={onEvent?.length > 0 ? "star" : "staro"}
        size={30}
        color={colors.accentColor}
      />
    </TouchableOpacity>
  );
};

export default SelectedButton;
