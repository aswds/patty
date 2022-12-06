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
import Skeleton from "../../../Skeleton/Skeleton";
import Loader from "../Loader";
import { MoreInfo } from "./abbo";
import EditButton from "../../Button";
import LogOutButton from "./LogoutButton";
import UserBio from "./UserBio";
import UserFollowers from "./UserFollowers";
import UserImage from "./UserImage";
import UserName from "./UserName";
export default function User({ user }) {
  const { fetchableImage } = useUserImage(user.userImage);
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <View
      style={{
        justifyContent: "center",
        paddingHorizontal: "5%",
        paddingTop: "10%",
      }}
    >
      {console.log(isLoading)}
      {isLoading && <Loader />}
      <UserImage uri={user.userImage} setIsLoading={setIsLoading} user={user} />
      {/* <LogOutButton /> */}
      {/* <EditButton /> */}

      {!isLoading && (
        <>
          <UserName user={user} styles={styles} />

          <UserBio user={user} />
          <UserFollowers user={user} />
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({});
