import React from "react";
import { TouchableOpacity, Image, Text } from "react-native";
import { colors } from "../../../../../src/colors";
export default function ACImage(props) {
  const { _showModalHandle, image } = props;
  return (
    <TouchableOpacity
      style={{
        height: 200,
        width: 200,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: colors.iconColor,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={_showModalHandle}
    >
      {image ? (
        <Image
          source={{ uri: image }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      ) : (
        <Text style={{ fontSize: 100 }}>🤔</Text>
      )}
    </TouchableOpacity>
  );
}
