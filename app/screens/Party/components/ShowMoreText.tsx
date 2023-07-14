import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  LayoutAnimation,
} from "react-native";
import { colors } from "../../../src/colors";
import { FontFamily } from "../../../../assets/fonts/Fonts";

const DESCRIPTION_MAX_LINES = 2;

export const Description = ({ description }: { description: string }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
    LayoutAnimation.configureNext({
      duration: 500,
      update: { type: "spring", springDamping: 1.5 },
    });
  };

  return (
    <TouchableOpacity
      onPress={toggleDescription}
      activeOpacity={0.9}
      style={{ width: "100%" }}
    >
      <View style={{}}>
        <Text
          numberOfLines={
            showFullDescription ? undefined : DESCRIPTION_MAX_LINES
          }
          style={styles.descriptionText}
        >
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  descriptionText: {
    textAlign: "left",
    fontSize: 14,
    color: colors.text_2,
    fontFamily: FontFamily.medium,
  },
});
