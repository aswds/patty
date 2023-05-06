import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../src/colors";
import { FontFamily } from "../../../assets/fonts/Fonts";
import { View, Text } from "react-native";
import { Fontisto } from "@expo/vector-icons";
export const NoEventFoundAlert = ({ isVisible }: { isVisible: boolean }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center",
        bottom: "20%",
        flexDirection: "row",
      }}
      pointerEvents="none"
    >
      <View
        style={{
          backgroundColor: "rgba(20, 20 , 20, 0.7)",
          padding: 10,
          borderRadius: 10,
          alignItems: "center",
          maxWidth: "80%",
        }}
      >
        <Text
          style={{
            color: colors.accentColor,
            fontFamily: FontFamily.bold,
            textAlign: "center",
          }}
        >
          Apologies, no parties found in your city right now.
        </Text>
      </View>
    </View>
  );
};
