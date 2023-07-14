import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

interface DoPartyButtonProps {
  onPress: () => void;
}

export default function DoPartyButton(props: DoPartyButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      style={[styles.buttonContainer, styles.mainButton]}
    >
      <Text numberOfLines={1} style={styles.textStyle}>
        make a party
      </Text>
    </TouchableOpacity>
  );
}
