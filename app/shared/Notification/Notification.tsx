import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";

interface NotificationProps {
  message: string;
}

const SCREEN_HEIGHT = Dimensions.get("window").height;

const Notification: React.FC<NotificationProps> = ({ message }) => {
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 2) {
          Animated.timing(pan, {
            toValue: { x: 0, y: 300 },
            duration: 200,
            useNativeDriver: false,
          }).start();
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: pan.y }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    width: "100%",
    height: SCREEN_HEIGHT * 0.1,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});

export default Notification;
