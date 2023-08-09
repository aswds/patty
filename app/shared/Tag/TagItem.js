import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontFamily } from "../../../assets/fonts/Fonts";
import { colors } from "../../src/colors";

export default function TagItem({ tag, onDelete, id }) {
  return (
    <TouchableOpacity
      style={styles.tagStyle}
      onLongPress={() => {
        onDelete && onDelete(id);
      }}
    >
      <Text style={styles.textStyle}>{tag}</Text>
      <AntDesign
        name="tago"
        size={20}
        color={colors.iconColor}
        style={{ paddingHorizontal: 5 }}
      />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.input,
    padding: 10,
    height: 50,
    borderRadius: 100,
  },
  tagStyle: {
    alignSelf: "flex-start",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.input,
    borderRadius: 100,
    margin: 5,
    flexDirection: "row",
  },
  textStyle: {
    color: colors.iconColor,
    fontFamily: FontFamily.bold,
  },
});
