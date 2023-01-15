import React from "react";
import { ActivityIndicator, Modal, View } from "react-native";
import { colors } from "../../../src/colors";

export default function Loader({ isVisible }) {
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.65)",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <ActivityIndicator size={"large"} color={colors.accentColor} />
        </View>
      </Modal>
    </View>
  );
}
