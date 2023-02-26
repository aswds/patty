import React, {useState} from "react";
import {Animated, ScrollView, StyleSheet, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {colors} from "../../../../src/colors";
import {animationStart, closeModal} from "./animations";
import {CloseButton} from "./CloseButton";

export default function Screen(props) {
  const { userCanScroll } = props;
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [animationBorder, setAnimationBorder] = useState(new Animated.Value(0));

  const [isAnimationRan, setIsAnimationRan] = useState(false);
  const insets = useSafeAreaInsets();

  const modalHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["85%", "100%"],
  });
  const modalBorderRad = animationBorder.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 0],
  });
  const modalStyle = {
    height: modalHeight,
    borderTopLeftRadius: modalBorderRad,
    borderTopRightRadius: modalBorderRad,
  };

  const dataForCloseModal = {
    setIsAnimationRan,
    setAnimation,
    setAnimationBorder,
    props,
  };

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
            onTouchMove={() => {
              if (!isAnimationRan) {
                animationStart(setIsAnimationRan, animation, animationBorder);
              }
            }}
            scrollEnabled={true}
            style={styles.scrollViewContainer}
            scrollEventThrottle={16}
            contentContainerStyle={{
              paddingTop: isAnimationRan ? insets.top : 0,
              paddingBottom: isAnimationRan ? insets.bottom : 0,
            }}
            showsVerticalScrollIndicator={false}
          >
            <View>
              <View style={{ alignSelf: "flex-end" }}>
                <CloseButton
                  closeModal={closeModal}
                  dataForCloseModal={dataForCloseModal}
                  color={colors.iconColor}
                  iconSize={45}
                />
              </View>

              {props.children}
            </View>
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
  },
  modalView: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    backgroundColor: colors.background,
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
