import Animated, {
  withSpring,
  useAnimatedStyle,
  useSharedValue,
  RollInRight,
  LightSpeedInRight,
  SlideInRight,
  SlideInLeft,
  PinwheelIn,
  RollInLeft,
  Easing,
} from "react-native-reanimated";
import { StyleSheet, Text } from "react-native";
import { FontFamily } from "../../../assets/fonts/Fonts";
import { colors } from "../../src/colors";

interface AnimatedErrorProps {
  errorMessage: string;
}

export default function AnimatedError({ errorMessage }: AnimatedErrorProps) {
  const errorMessageAnimation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: errorMessageAnimation.value }],
    };
  });
  if (errorMessage) {
    errorMessageAnimation.value = withSpring(100);
  }
  return (
    <Animated.View style={[styles.errorContainer, animatedStyles]}>
      <Text style={styles.textStyle}>{errorMessage}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    height: 50,
  },
  textStyle: {
    fontFamily: FontFamily.bold,
    color: colors.error,
  },
});
