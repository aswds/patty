import React from "react";

import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useUserImage from "../../../hooks/useUserImage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { colors } from "../../../src/colors";
import { IUser } from "../../../Types/User";
import { ProfileNavigationProps } from "../../../Types/ProfileStack/ScreenNavigationProps";

// Button to navigate to profile screen

interface ProfileButtonProps {
  current_user: IUser;
}
const ProfileButton = ({ current_user }: ProfileButtonProps) => {
  const { image } = useUserImage();
  const navigation = useNavigation<ProfileNavigationProps>();
  const insets = useSafeAreaInsets();
  function onPress() {
    navigation.navigate("ProfileNav", {
      screen: "Profile",
      params: { current_user },
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }
  return (
    <TouchableOpacity
      style={[styles.container, { marginTop: insets.top }]}
      onPress={onPress}
    >
      <Image
        source={
          { uri: current_user.image } ??
          require("../../../../assets/images/noImage-01.png")
        }
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
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 9999,
    overflow: "hidden",
  },
});
export default ProfileButton;
