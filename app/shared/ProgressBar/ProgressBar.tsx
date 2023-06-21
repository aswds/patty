import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../src/colors";

interface ProgressBarProps {
  progress: number;
  color?: string;
  backgroundColor?: string;
  height?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = colors.accentColor,
  backgroundColor = "#f0f0f0",
  height = 5,
}) => {
  return (
    <View style={[styles.progressBar, { backgroundColor, height }]}>
      <View
        style={[
          styles.progress,
          { width: `${progress * 100}%`, backgroundColor: color },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    borderRadius: 5,
    height: 5,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
  },
});

export default ProgressBar;
