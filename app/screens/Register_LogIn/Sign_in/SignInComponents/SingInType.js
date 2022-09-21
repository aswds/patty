import { FontAwesome } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity } from "react-native";

export const SingInType = ({ name, size, onPress, style, color }) => {
  return (
    <TouchableOpacity style={[styles.iconContainer, style]} onPress={onPress}>
      <FontAwesome
        name={name}
        backgroundColor="#121212"
        color={color ? color : "white"}
        size={size}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  iconContainer: {
    borderWidth: 0,
    borderRadius: 5,
    borderColor: "white",
    alignItems: "center",
    width: 70,
    height: 50,
    justifyContent: "center",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
  },
});
