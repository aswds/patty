import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import ImageWithEmojiUI from "./Post";
import { image } from "../../../../../assets/images";
import PartyHeader from "./PartyHeader";

interface Data {
  id: number;
  image: string;
  description: string;
}

const FontFamily = {
  bold: "your-bold-font-family-name",
};

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PostFlatlist = () => {
  const [data, setData] = useState<Data[]>(
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      image: image.noImage,
      description: "Lorem ipsum",
    }))
  );

  return <View style={{ flex: 1 }}></View>;
};

export default PostFlatlist;
