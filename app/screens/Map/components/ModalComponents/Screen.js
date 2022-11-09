import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Screen(props) {
  const { modalStyle, userCanScroll, animationStart } = props;
  const [isAnimationRan, setIsAnimationRan] = useState(false);
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.centeredView}>
      <Animated.View
        style={{
          ...modalStyle,
          ...styles.modalView,
        }}
      >
        <View style={styles.scrollViewContainer}>
          <ScrollView
            onScroll={() => animationStart(isAnimationRan, setIsAnimationRan)}
            scrollEnabled={userCanScroll}
            style={styles.scrollViewContainer}
            scrollEventThrottle={1}
            contentContainerStyle={{
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
            }}
            showsVerticalScrollIndicator={false}
          >
            <View>{props.children}</View>
          </ScrollView>
        </View>
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalView: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: "white",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollViewContainer: { flex: 1 },
});
