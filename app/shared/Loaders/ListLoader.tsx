import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { FontFamily } from "../../../assets/fonts/Fonts";
import { colors } from "../../src/colors";

interface ListLoaderProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
  text?: string;
  size?: "small" | "large";
}

const ListLoader = ({ style, textStyle, text, size }: ListLoaderProps) => {
  return (
    <View style={[styles.loaderContainer, style]}>
      <ActivityIndicator size={size ?? "large"} color={colors.accentColor} />
      <Text style={[styles.textStyle, textStyle]}>{text ?? "Loading"}</Text>
    </View>
  );
};

export default ListLoader;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    marginVertical: "5%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  textStyle: {
    fontFamily: FontFamily.bold,
    color: colors.accentColor,
  },
});
