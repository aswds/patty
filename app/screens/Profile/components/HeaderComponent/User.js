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
import Loader from "../Loader";
import { MoreInfo } from "./abbo";
import EditButton from "../../Button";
import LogOutButton from "./LogoutButton";
import UserBio from "./UserBio";
import UserFollowers from "./UserFollowers";
import UserImage from "./UserImage";
import UserName from "./UserName/UserName";
import { Skeleton } from "moti/skeleton";
import AccountNotVerified from "../../AccountNotVerified";
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
      <AccountNotVerified isVerified={user.verifiedEmail} />
      <UserImage
        uri={user.userImage}
        Loader={{ isLoading, setIsLoading }}
        user={user}
      />

      {/* <LogOutButton /> */}
      {/* <EditButton /> */}
      <UserName user={user} styles={styles} isLoading={isLoading} />

      {!isLoading && (
        <>
          <UserBio user={user} />
          <UserFollowers user={user} />
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({});
