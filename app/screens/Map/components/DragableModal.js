import React, { useState } from "react";
import { Animated, Modal, PanResponder, StyleSheet, View } from "react-native";

export const DraggableModal = ({ visible, onClose, children }) => {
  const [pan] = useState(new Animated.ValueXY());

  // Define the pan responder to handle user gestures
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (e, gestureState) => {
      // If the modal is dragged more than 50% off the screen, close it
      if (gestureState.dy > 0.5 * window.height) {
        onClose();
      } else {
        // Otherwise, animate the modal back to its original position
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.modal,
            { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
          ]}
          {...panResponder.panHandlers}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
  },
});
