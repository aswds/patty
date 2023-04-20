import React, { useState } from "react";

import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontFamily } from "../../../assets/fonts/Fonts";
import { colors } from "../../src/colors";
import { IEvent_User } from "../../Types/Events";
import { useNavigation } from "@react-navigation/native";
import { ProfileNavigationProps } from "../../Types/ProfileStack/ScreenNavigationProps";
import { getUserByUID } from "../../services/getUserByUID";
import { Skeleton } from "moti/skeleton";
import { image } from "../../../assets/images";

interface UserInfoProps {
  user: IEvent_User;
}
const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const navigation = useNavigation<ProfileNavigationProps>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  function onPress() {
    getUserByUID(user?.uid).then((user) => {
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
          "It looks like the user you're trying to find doesn't exist in our system."
        );
      }
    });
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.usernameText} numberOfLines={1}>
        by {user?.username}
      </Text>
      <View style={styles.imageContainer}>
        <Skeleton show={isLoading} radius={"round"} height={27} width={27}>
          <Image
            source={user?.image ? { uri: user?.image } : image.noImage}
            style={styles.imageStyle}
            onLoadEnd={() => setIsLoading(false)}
          />
        </Skeleton>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  usernameText: {
    fontFamily: FontFamily.regular,
    fontSize: 15,
    color: colors.iconColor,
    flexShrink: 1,
  },
  imageContainer: {
    height: 25,
    aspectRatio: 1,
    marginLeft: "5%",
  },
  imageStyle: { width: "100%", height: "100%", borderRadius: 999 },
});
export default UserInfo;
