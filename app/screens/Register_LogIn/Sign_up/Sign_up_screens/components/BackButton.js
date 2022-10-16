import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
export const BackButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        zIndex: 1,
        left: 15,
        top: 0,
      }}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <FontAwesome5 name="arrow-left" size={30} color={"black"} />
    </TouchableOpacity>
  );
};
