import React from "react";
import { ActivityIndicator, Modal, View } from "react-native";

export default function Loader({ isVisible }) {
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={"large"} color={"white"} />
        </View>
      </Modal>
    </View>
  );
}
