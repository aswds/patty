import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import UserBio from "./UserBio";
import UserFollowers from "./UserFollowers";
import UserImage from "./UserImage";
import UserName from "./UserName/UserName";
import { IUser } from "../../../../Types/User";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../src/colors";
import { onSnapshot } from "firebase/firestore";
import { userReference } from "../../../../Firebase/References";
import Notification from "./Notification";

interface UserProps {
  user: IUser;
  backButton?: React.ReactNode;
  updateUser: (newUser: Pick<IUser, "following" | "followers">) => void;
}
export default function User({ user, backButton, updateUser }: UserProps) {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "5%",
        }}
      >
        {backButton}
        <Notification />
      </View>

      {/*Component UserImage contains follow/unfollow buttons !!!*/}
      <UserImage
        Loader={{ isLoading, setIsLoading }}
        user={user}
        updateUser={updateUser}
      />
      <UserName user={user} isLoading={isLoading} />
      {!isLoading && (
        <>
          <UserBio user={user} />
          <UserFollowers user={user} />
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: "5%",
  },
});
