import { FontAwesome5 } from "@expo/vector-icons";
import { Platform, TouchableOpacity } from "react-native";
export const BackButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        zIndex: 1,
        left: 15,
        top: 0,
        margin: Platform.OS == "android" ? 10 : 0,
      }}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <FontAwesome5 name="arrow-left" size={30} color={"black"} />
    </TouchableOpacity>
  );
};
