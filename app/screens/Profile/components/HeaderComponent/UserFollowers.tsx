import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { IUser } from "../../../../Types/User";
import { colors } from "../../../../src/colors";

interface IUserFollowNumbers {
  followers?: number;
  following?: number;
}

interface UserFollowersProps {
  user: IUser;
  followersText?: string;
  followingText?: string;
}

export default function UserFollowers({
  user,
  followersText,
  followingText,
}: UserFollowersProps) {
  const [userFollowNumbers, setUserFollowNumbers] =
    useState<IUserFollowNumbers>({
      followers: user?.followers?.length ?? 0,
      following: user?.following?.length ?? 0,
    });
  useEffect(() => {
    setUserFollowNumbers({
      followers: user?.followers?.length ?? 0,
      following: user?.following?.length ?? 0,
    });
  }, [user]);
  return (
    <View style={styles.followersContainer}>
      <TouchableOpacity style={styles.textContainer}>
        <Text style={styles.numberTextStyle}>
          {user?.followers?.length ?? 0}
        </Text>

        <Text style={styles.followTextStyle}>
          {followersText ?? "followers"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.textContainer, { marginLeft: "5%" }]}>
        <Text style={styles.numberTextStyle}>
          {userFollowNumbers.following}
        </Text>
        <Text style={styles.followTextStyle}>
          {followingText ?? "following"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  followersContainer: {
    flexDirection: "row",
    marginVertical: "5%",
    justifyContent: "flex-start",
    flexShrink: 1,
  },
  followTextStyle: {
    fontFamily: FontFamily.regular,
    color: colors.iconColor,
  },
  numberTextStyle: {
    fontFamily: FontFamily.bold,
    color: colors.text,
    marginRight: "5%",
  },
  textContainer: {
    flexDirection: "row",
  },
});
