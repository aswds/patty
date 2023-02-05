import React from "react";
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";
import { colors } from "../../src/colors";

export default function Loader({ isVisible, style, containerStyle, ...other }) {
  return (
    <View style={containerStyle}>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <View style={[styles.container, style]} {...other}>
          <ActivityIndicator size={"large"} color={colors.accentColor} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
