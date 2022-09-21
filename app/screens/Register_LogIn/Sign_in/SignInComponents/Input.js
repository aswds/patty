import { View, TextInput, Dimensions } from "react-native";
import { styles } from "../styles";
export const Input = (props) => {
  return (
    <View
      style={{
        ...styles.userInput,
        borderWidth: props.isValid ? null : 1,
        borderColor: props.isValid ? "black" : "red",
      }}
    >
      {props.children}
      <View style={{ marginHorizontal: 15 }}>{props.icon}</View>
    </View>
  );
};
