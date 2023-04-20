import React from "react";

import {
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { colors } from "../../../src/colors";
import { ProfileNavigationProps } from "../../../Types/ProfileStack/ScreenNavigationProps";
import { useActions } from "../../../hooks/useActions";
import { IUser } from "../../../Types/User";
import { getUserByUID } from "../../../services/getUserByUID";
import { image } from "../../../../assets/images";

// Button to navigate to profile screen

interface ProfileButtonProps {
  onLongPress?: () => void;
  userUID: string;
  userImage?: string;
  containerStyle?: ViewStyle;
}
const ProfileButton = ({
  onLongPress,
  userUID,
  userImage,
  containerStyle,
}: ProfileButtonProps) => {
  const navigation = useNavigation<ProfileNavigationProps>();
  const insets = useSafeAreaInsets();
  function onPress() {
    getUserByUID(userUID).then((user) => {
      if (user)
        navigation.navigate("ProfileNav", {
          screen: "Profile",
          params: {
            current_user: user,
          },
        });
      else {
        Alert.alert(
          "Oops!",
          "It looks like the user you're trying to reach doesn't exist in our system."
        );
      }
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Image
        source={userImage ? { uri: userImage } : image.noImage}
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: colors.background,
          borderRadius: 9999,
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
    borderWidth: 2,
    borderColor: colors.accentColor,
    borderRadius: 9999,
    overflow: "hidden",
    backgroundColor: colors.background,
  },
});
export default ProfileButton;
