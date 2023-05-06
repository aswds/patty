import React, { useEffect, useState } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

interface Props {
  progress: number; // progress value between 0 and 1
  width: number; // width of the progress bar
  height: number; // height of the progress bar
  backgroundColor?: string; // background color of the progress bar
  fillColor?: string; // fill color of the progress bar
}

const ProgressBar: React.FC<Props> = ({
  progress,
  width,
  height,
  backgroundColor = "#f2f2f2",
  fillColor = "#4287f5",
}) => {
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const animatedWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={[styles.container, { width, height, backgroundColor }]}>
      <Animated.View
        style={[
          styles.fill,
          {
            width: animatedWidth,
            height,
            backgroundColor: fillColor,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  fill: {
    borderRadius: 5,
  },
});

export default ProgressBar;
