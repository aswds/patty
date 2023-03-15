import React from "react";
import { StyleSheet, View } from "react-native";
import UserBio from "./UserBio";
import UserFollowers from "./UserFollowers";
import UserImage from "./UserImage";
import UserName from "./UserName/UserName";
import { BackButton } from "../../../../shared/Buttons/BackButton";
import { useNavigation } from "@react-navigation/native";
import { isAndroid } from "../../../../src/platform";
import { IUser } from "../../../../Types/User";

//
interface UserProps {
  user: IUser;
}
export default function User({ user }: UserProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} style={styles.backButtonStyle} />

      {/*Component UserImage contains follow/unfollow buttons !!!*/}
      <UserImage Loader={{ isLoading, setIsLoading }} user={user} />

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
  backButtonStyle: {
    position: "relative",
    left: isAndroid ? -15 : 0,
    marginBottom: 20,
  },
});
