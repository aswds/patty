import React from "react";
import { View, Text } from "react-native";
export default function NMAskName(props) {
  const { styles } = props;
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <View>
        <Text style={styles.title}>Hi! 👋</Text>
        <Text
          style={{
            fontFamily: "WorkSans-Regular",
            fontSize: 17,
            color: "black",
          }}
        >
          What's your name?
        </Text>
      </View>
    </View>
  );
}
