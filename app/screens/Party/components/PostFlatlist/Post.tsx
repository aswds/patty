import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
} from "react-native";
import { Description } from "../ShowMoreText";
import FastImage from "react-native-fast-image";
interface Props {
  imageSource: any;
  description: string;
}

const ImageWithEmojiUI: React.FC<Props> = ({ imageSource, description }) => {
  return (
    <View style={{ flex: 1 }}>
      <Image source={imageSource} style={{ width: "100%", height: 200 }} />
      <View style={{ padding: 10 }}>
        <Description description={description} />
        <View style={{ flexDirection: "row", alignItems: "center" }}></View>
      </View>
    </View>
  );
};

export default ImageWithEmojiUI;
