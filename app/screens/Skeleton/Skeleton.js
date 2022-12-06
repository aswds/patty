/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, View, Dimensions, Animated, Platform } from "react-native";
import { colors } from "../../src/colors";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu",
});

type Props = {};
export default class Skeleton extends Component<Props> {
  constructor(props) {
    super(props);
    this.circleAnimatedValue = new Animated.Value(0);
  }
  circleAnimated = () => {
    this.circleAnimatedValue.setValue(0);
    Animated.timing(this.circleAnimatedValue, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        this.circleAnimated();
      }, 1000);
    });
  };
  componentDidMount() {
    this.circleAnimated();
  }
  render() {
    const translateX = this.circleAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-10, 100],
    });
    return (
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 60,
          backgroundColor: colors.buttonBG,
          overflow: "hidden",
          marginRight: 16,
        }}
      >
        <Animated.View
          style={{
            width: "30%%",
            opacity: 0.2,
            height: "100%",
            backgroundColor: "white",
            transform: [{ translateX: translateX }],
          }}
        ></Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECEFF1",
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    padding: 16,
    shadowColor: "black",
    borderRadius: 4,
    backgroundColor: "#FAFAFA",
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    flexDirection: "row",
  },
});
