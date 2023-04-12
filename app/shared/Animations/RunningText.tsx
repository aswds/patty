import React, { useRef, useEffect, useState } from "react";
import {
  Animated,
  LayoutChangeEvent,
  ScrollView,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { FontFamily } from "../../../assets/fonts/Fonts";
import { colors } from "../../src/colors";

interface RunningTextProps {
  title?: string;
  artist?: string;
}

const RunningText: React.FC<RunningTextProps> = ({ title, artist }) => {
  const textRef = useRef<Text>(null);
  const [textWidth, setTextWidth] = useState(0);
  const [viewWidth, setViewWidth] = useState(0);
  const [runAnimationBoolean, setRunAnimation] = useState(false);
  const [animation] = useState<Animated.Value>(new Animated.Value(0));

  const onTextLayout = (event: LayoutChangeEvent) => {
    setTextWidth(event.nativeEvent.layout.width);
  };
  const onViewLayout = (event: LayoutChangeEvent) => {
    setViewWidth(event.nativeEvent.layout.width);
  };
  function runAnimation() {
    const animationDuration = textWidth * 15; // adjust this value to change animation speed
    const delayDuration = 2000; // adjust this value to change delay before reversing animation

    const animationSequence = Animated.sequence([
      Animated.timing(animation, {
        toValue: -(textWidth - viewWidth + 35),
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.delay(delayDuration),

      Animated.timing(animation, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.delay(delayDuration),
    ]);
    Animated.loop(animationSequence).start();
  }

  useEffect(() => {
    if (!runAnimationBoolean) {
      const unsub = setTimeout(() => {
        setRunAnimation(true);
      }, 1000);
      return () => clearTimeout(unsub);
    } else {
      runAnimation();
    }
  }, [runAnimationBoolean]);

  return (
    <ScrollView
      style={{
        overflow: "hidden",
        shadowColor: "black",
      }}
      onLayout={onViewLayout}
      horizontal
      scrollEnabled={false}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <Animated.View style={{ transform: [{ translateX: animation }] }}>
        <Text
          ref={textRef}
          numberOfLines={1}
          onLayout={onTextLayout}
          style={styles.textStyle}
        >
          {title}
          <Text style={styles.artistTextStyle}>
            <Text style={{ fontSize: 12 }}> 🪩 </Text>
            {artist}
          </Text>
        </Text>
      </Animated.View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    fontFamily: FontFamily.extra_bold,
    fontSize: 17,
    color: colors.text,
    marginLeft: 15,
  },
  artistTextStyle: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: colors.disabledText,
  },
});
export default RunningText;
