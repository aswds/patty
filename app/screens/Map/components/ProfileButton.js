import React from "react";

import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useUserImage from "../../../hooks/useUserImage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { colors } from "../../../src/colors";
// Button to navigate to profile screen
const ProfileButton = () => {
  const { image } = useUserImage();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  function onPress() {
    navigation.navigate("ProfileNav");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }
  return (
    <TouchableOpacity
      style={[styles.container, { marginTop: insets.top }]}
      onPress={onPress}
    >
      <Image
        source={image}
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: colors.background,
        }}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 55,
    aspectRatio: 1,
    position: "absolute",
    top: "1%",
    right: "5%",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 99999,
    overflow: "hidden",
  },
});
export default ProfileButton;
