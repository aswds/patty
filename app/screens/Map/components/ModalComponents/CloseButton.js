import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function CloseButton({
  closeModal,
  dataForCloseModal,
  color,
  iconSize,
}) {
  return (
    <TouchableOpacity
      onPress={() => closeModal(dataForCloseModal)}
      style={styles.iconContainer}
    >
      {console.log(dataForCloseModal)}
      <Ionicons name="close" size={iconSize} color={color} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  iconContainer: {
    margin: 10,
  },
});