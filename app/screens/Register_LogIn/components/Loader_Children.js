import React from "react";
import { ActivityIndicator, Modal, View } from "react-native";

interface LoaderProps {
  isVisible: boolean;
}

export const Loader_Children: React.FC<LoaderProps> = ({
  isVisible,
  children,
}) => {
  return (
    <View style={{ position: "absolute" }}>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <ActivityIndicator size={"large"} color={"white"} />
        </View>

        {children}
      </Modal>
    </View>
  );
};
