
import { Feather, Ionicons } from "@expo/vector-icons";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { FontFamily } from "../../../assets/fonts/Fonts";
import { colors } from "../../src/colors";

interface SearchBarProps extends TextInputProps {
  containerStyle: ViewStyle;
  inputStyle: StyleProp<TextStyle>;
  onPressClear: () => void;
}

const SearchBar = ({
  containerStyle,
  inputStyle,
  onPressClear,
  ...props
}: SearchBarProps) => {
  return (
    <View style={[containerStyle, styles.container]}>
      <Feather
        name="search"
        size={30}
        color={colors.accentColor}
        style={{ marginRight: 5 }}
      />
      <TextInput {...props} style={[inputStyle]} keyboardAppearance={"dark"} />
      <TouchableOpacity
        style={styles.closeButtonContainer}
        onPress={onPressClear}
      >
        <Ionicons name="close-circle" size={24} color={colors.iconColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  closeButtonContainer: {},
  textInputStyle: {
    fontFamily: FontFamily.bold,
  },
});

export default SearchBar;
