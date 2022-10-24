import { View, ActivityIndicator } from "react-native";
export const Loader = (isLoading) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0)",
      }}
    >
      <ActivityIndicator size={"small"} color="grey" />
    </View>
  );
};
