import React from "react";
import { StyleSheet, View } from "react-native";
import UserBio from "./UserBio";
import UserFollowers from "./UserFollowers";
import UserImage from "./UserImage";
import UserName from "./UserName/UserName";
import { IUser } from "../../../../Types/User";

//
interface UserProps {
  user: IUser;
  backButton?: React.ReactNode;
  updateUser: (newUser: Pick<IUser, "following" | "followers">) => void;
}
export default function User({ user, backButton, updateUser }: UserProps) {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <View style={styles.container}>
      {backButton}

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
