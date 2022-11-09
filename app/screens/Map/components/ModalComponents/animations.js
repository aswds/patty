import Animated from "react-native-reanimated";
export const animationStart = async (isAnimationRan, setIsAnimationRan) => {
  if (!isAnimationRan) {
    Animated.parallel([
      Animated.timing(animation, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(animationBorder, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(),
      setIsAnimationRan(true);
  }
};
