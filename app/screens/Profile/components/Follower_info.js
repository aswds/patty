import React from "react";
import {StyleSheet, View} from "react-native";
import {colors} from "../../../src/colors";
import Following from "./FollowComponents/Following";
import Followers from "./FollowComponents/Followers";

export default function Follower_info() {
  return (
    <View style={styles.container}>
      <Followers styles={styles} followers={39} />
      <Following styles={styles} following={49} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    position: "relative",
    marginVertical: 20,
  },
  textStyle: {
    fontFamily: "Nunito-Regular",
    color: colors.text,
    fontSize: 14,
  },
  followNubmerStyle: {
    fontFamily: "Nunito-Bold",
    fontSize: 13,
    color: "lightgrey",
  },
  followContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
