import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { colors } from "../../../../src/colors";

interface CircleRadiusButtonProps {
  radius: number;
  selectedRadius: number;
  onPress: (radius: number) => void;
}

const CircleRadiusButton: React.FC<CircleRadiusButtonProps> = ({
  radius,
  selectedRadius,
  onPress,
}) => {
  const isRadiusSelected = selectedRadius === radius;

  const handlePress = () => {
    onPress(radius);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.container}>
        <View
          style={[
            styles.circle,
            {
              height: radius / 5,
              backgroundColor: isRadiusSelected
                ? colors.accentColor
                : colors.background,
              borderWidth: isRadiusSelected ? 0 : 2,
            },
          ]}
        />
        {isRadiusSelected && (
          <View style={styles.centeredContainer}>
            <View
              style={[
                styles.selectedCircle,
                {
                  height: radius / 30,
                },
              ]}
            />
          </View>
        )}
      </View>
      <Text style={styles.text}>{radius} M</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  circle: {
    borderColor: colors.text_2,
    aspectRatio: 1,
    borderRadius: 9999999,
    backgroundColor: colors.accentColor,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredContainer: {
    position: "absolute",
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCircle: {
    aspectRatio: 1,
    borderRadius: 999999,
    backgroundColor: colors.text,
    position: "absolute",
  },
  text: {
    fontFamily: FontFamily.bold,
    fontSize: 13,
    color: colors.text,
  },
});

export default CircleRadiusButton;
