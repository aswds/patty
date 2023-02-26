import { ActivityIndicator, View } from "react-native";
import { colors } from "../../../src/colors";

export const Loader = (isLoading) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
      }}
    >
      <ActivityIndicator size={"small"} color={colors.accentColor} />
    </View>
  );
};
