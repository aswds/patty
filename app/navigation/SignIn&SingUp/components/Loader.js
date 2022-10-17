import { View, ActivityIndicator } from "react-native";
export const Loader = (isLoading) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={"small"} color="grey" />
    </View>
  );
};
