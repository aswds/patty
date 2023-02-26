import React from "react";
import {View} from "react-native";

export default function Container(props) {
  const { styles } = props;
  return (
    <View style={([styles?.container], { paddingLeft: "7%" })}>
      {props.children}
    </View>
  );
}
