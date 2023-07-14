import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { FontFamily } from "../../../assets/fonts/Fonts";
import { colors } from "../../src/colors";

interface AnimatedErrorProps {
  errorMessage: string;
  onPress: () => void;
}

export default function AnimatedError({
  errorMessage,
  onPress,
}: AnimatedErrorProps) {
  const errorMessageAnimation = useSharedValue(-100);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: errorMessageAnimation.value }],
    };
  });
  if (errorMessage) {
    errorMessageAnimation.value = withSpring(0);
  }
  return (
    <Animated.View style={[styles.errorContainer, animatedStyles]}>
      <Pressable
        onPress={onPress}
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <MaterialIcons
          name="error-outline"
          size={24}
          color={colors.text_2}
          style={{ marginRight: "1%" }}
        />
        <Text style={styles.textStyle}>{errorMessage}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    bottom: 0,
  },
  textStyle: {
    fontFamily: FontFamily.bold,
    fontSize: 13,
    color: "grey",
    flexWrap: "wrap",
    paddingHorizontal: "5%",
  },
});
