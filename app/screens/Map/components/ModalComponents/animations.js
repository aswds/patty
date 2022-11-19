import { Animated } from "react-native";
export const animationStart = async (
  setIsAnimationRan,
  animation,
  animationBorder
) => {
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
};

export function closeModal(dataForCloseModal) {
  const { setAnimation, setIsAnimationRan, setAnimationBorder, props } =
    dataForCloseModal;
  setIsAnimationRan(false), props.hideModal();
  setAnimation(new Animated.Value(0));
  setAnimationBorder(new Animated.Value(0));
}
