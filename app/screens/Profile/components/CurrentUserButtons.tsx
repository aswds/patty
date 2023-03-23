import React from "react";

import { Alert } from "react-native";
import Button from "../../../shared/Buttons/Button";
import { auth } from "../../../../firebase";
import { useNavigation } from "@react-navigation/native";
import { ProfileNavigationProps } from "../../../Types/ProfileStack/ScreenNavigationProps";
import { IUser } from "../../../Types/User";
import Follow_UnfollowButtons from "../Follow_UnfollowButtons";

interface CurrentUserButtonsProps {
  user: IUser;
  updateUser: (newUser: Pick<IUser, "following" | "followers">) => void;
}

const CurrentUserButtons = ({ user, updateUser }: CurrentUserButtonsProps) => {
  const navigation = useNavigation<ProfileNavigationProps>();
  const onPress = () => {
    navigation.navigate("ProfileNav", {
      screen: "EditProfile",
      params: {
        current_user: user,
      },
    });
  };
  return user.uid === auth.currentUser?.uid ? (
    <>
      <Button
        onPress={async () => {
          Alert.alert("Are you sure?", "", [
            {
              text: "Log out",
              onPress: async () => await auth.signOut(),
              style: "destructive",
            },
            { text: "Cancel", onPress: () => {}, style: "default" },
          ]);
        }}
        text={"Log out"}
      />
      <Button onPress={onPress} text="Edit" />
    </>
  ) : (
    <Follow_UnfollowButtons user={user} updateUser={updateUser} />
  );
};

export default CurrentUserButtons;
