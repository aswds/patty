import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  LayoutAnimation,
} from "react-native";
import { colors } from "../../../src/colors";

const DESCRIPTION_MAX_LINES = 2;

export const Description = ({ description }: { description: string }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
    LayoutAnimation.configureNext({
      duration: 500,
      update: { type: "spring", springDamping: 0.8 },
    });
  };

  return (
    <TouchableOpacity onPress={toggleDescription}>
      <View>
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
    fontSize: 16,
    lineHeight: 24,
    color: colors.text_2,
  },
});
