import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { FontFamily } from "../../../../../../assets/fonts/Fonts";
import { colors } from "../../../../../src/colors";
import { IEvent_User } from "../../../../../Types/Events";
import { useNavigation } from "@react-navigation/native";
import { ProfileNavNavigatorParamList } from "../../../../../Types/ProfileStack/NavigationTypes";
import { ProfileNavigationProps } from "../../../../../Types/ProfileStack/ScreenNavigationProps";
import { getUserByUID } from "../../../../../services/getUserByUID";
import { Skeleton } from "moti/skeleton";
interface UserContainerProps {
  user: IEvent_User;
  userContainerStyle?: ViewStyle;
}

const UserContainer: React.FC<UserContainerProps> = ({
  user,
  userContainerStyle,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigation = useNavigation<ProfileNavigationProps>();

  async function onPress() {
    await getUserByUID(user.uid).then((user) => {
      navigation.navigate("ProfileNav", {
        screen: "Profile",
        params: {
          current_user: user,
        },
      });
    });
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.userContainer, userContainerStyle]}
      onPress={onPress}
    >
      <View style={styles.userPhotoContainer}>
        <Skeleton show={isLoading} radius="round">
          <Image
            source={{ uri: user?.image }}
            style={styles.userPhoto}
            onLoad={() => setIsLoading(false)}
          />
        </Skeleton>
      </View>

      <View style={{ justifyContent: "center" }}>
        <Text style={styles.userName}>
          {user?.name} {user?.surname}
        </Text>
        <Text style={styles.userNickname}>@{user?.username}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserContainer;

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
  },

  userContainer: {
    flexDirection: "row",
    justifyContent: "center",
    overflow: "hidden",
    alignItems: "center",
  },
  userPhotoContainer: {
    aspectRatio: 1,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  userPhoto: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  userName: {
    fontFamily: FontFamily.bold,
    color: colors.text,
  },
  userNickname: {
    color: colors.text_2,
    fontFamily: FontFamily.medium,
    fontSize: 12,
  },
});
