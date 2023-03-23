import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../../src/colors";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { IUser } from "../../../../Types/User";

interface IUserFollowNumbers {
  followers?: number;
  following?: number;
}

export default function UserFollowers({ user }: { user: IUser }) {
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

        <Text style={styles.followTextStyle}>followers</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.textContainer, { marginLeft: "5%" }]}>
        <Text style={styles.numberTextStyle}>
          {userFollowNumbers.following}
        </Text>
        <Text style={styles.followTextStyle}>following</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  followersContainer: {
    flexDirection: "row",
    marginVertical: "5%",
    justifyContent: "flex-start",
  },
  followTextStyle: {
    fontFamily: FontFamily.regular,
    color: colors.iconColor,
  },
  numberTextStyle: {
    fontFamily: FontFamily.bold,
    color: "white",
    marginRight: "5%",
  },
  textContainer: {
    flexDirection: "row",
  },
});
