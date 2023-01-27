import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../../src/colors";

const Button = (props) => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.7}
      style={[styles.container, props.style]}
    >
      <View style={{ justifyContent: "center" }}>
        <Text style={{ ...props.textStyle, color: colors.buttonTextColor }}>
          {props.children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width / 1.5,
    height: Dimensions.get("window").height / 17,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: colors.accentColor,
    borderWidth: 0,
  },
  linearGradient: {
    flex: 1,
  },
});
export default Button;
