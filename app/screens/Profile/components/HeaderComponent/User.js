import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import useUserImage from "../../../../hooks/useUserImage";
import { MoreInfo } from "./abbo";
import EditButton from "./EditButton";
import LogOutButton from "./LogoutButton";
import UserBio from "./UserBio";
import UserFollowers from "./UserFollowers";
import UserImage from "./UserImage";
import UserName from "./UserName";
export default function User({ user, setIsLoading }) {
  const { fetchableImage } = useUserImage(user.userImage);
  return (
    <View
      style={{
        justifyContent: "center",
        paddingHorizontal: "5%",
        paddingTop: "10%",
      }}
    >
      <UserImage uri={user.userImage} setIsLoading={setIsLoading} />
      {/* <LogOutButton /> */}
      {/* <EditButton /> */}

      <UserName user={user} styles={styles} />
      <UserBio user={user} />
      {/* <UserBio user={user} /> */}
      <UserFollowers user={user} />
    </View>
  );
}
const styles = StyleSheet.create({});
