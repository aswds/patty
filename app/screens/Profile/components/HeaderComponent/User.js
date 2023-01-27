import React from "react";
import { StyleSheet, View } from "react-native";
import useUserImage from "../../../../hooks/useUserImage";
import UserBio from "./UserBio";
import UserFollowers from "./UserFollowers";
import UserImage from "./UserImage";
import UserName from "./UserName/UserName";

export default function User({ user }) {
  const { fetchableImage } = useUserImage(user.userImage);
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <View
      style={{
        justifyContent: "center",
        paddingHorizontal: "5%",
        paddingTop: user.verifiedEmail ? "10%" : "15%",
      }}
    >
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
