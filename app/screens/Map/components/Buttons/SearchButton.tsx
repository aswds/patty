import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { colors } from "../../../../src/colors";
import { styles } from "./styles";

interface SearchButtonProps {
  onPress: () => void;
}

const SearchButton = ({ onPress }: SearchButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, styles.additionalButton]}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name="map-search"
        size={30}
        color={colors.accentColor}
      />
    </TouchableOpacity>
  );
};

export default SearchButton;
