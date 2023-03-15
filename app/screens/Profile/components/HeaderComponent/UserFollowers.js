import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../../src/colors";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import Loader from "../../../../shared/Loaders/Loader";

export default function UserFollowers(data) {
  const { user } = data;
  if (!user) {
    return <Loader isVisible={user} />;
  }
  console.log(user);
  const userFollowNumbers = {
    followers: user?.followers?.length ?? 0,
    following: user?.following?.length ?? 0,
  };
  return (
    <View style={styles.followersContainer}>
      <TouchableOpacity style={styles.textContainer}>
        <Text style={styles.numberTextStyle}>
          {userFollowNumbers.followers}
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
    height: null,
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
