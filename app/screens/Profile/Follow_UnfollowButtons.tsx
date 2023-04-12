import React, { useEffect, useState } from "react";
import { followUser } from "../Map/Firebase/followUser";
import { auth } from "../../../firebase";
import { colors } from "../../src/colors";
import Button from "../../shared/Buttons/Button";
import { IUser } from "../../Types/User";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { unfollowUser } from "../Map/Firebase/unfollowUser";
import { removeItemOnce } from "../../helpers/removeItemOnce";

interface Follow_UnfollowButtonsProps {
  user: IUser;
  updateUser: (newUser: Pick<IUser, "following" | "followers">) => void;
}

const Follow_UnfollowButtons = ({
  user,
  updateUser,
}: Follow_UnfollowButtonsProps) => {
  const { uid } = useTypedSelector((state) => state.user_state.current_user);

  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  useEffect(() => {
    setIsFollowing(user?.followers?.includes(uid!));
  }, []);

  function follow_Unfollow_function() {
    if (isFollowing) {
      //unfollow user
      unfollowUser(auth.currentUser?.uid!, user.uid!).then(() => {
        updateUser({
          ...user,
          followers: removeItemOnce(user.followers, auth.currentUser?.uid!),
        });
        setIsFollowing(false);
      });
    } else {
      //follow user
      followUser(auth.currentUser?.uid!, user.uid!).then(() => {
        updateUser({
          ...user,
          followers: [...user?.followers, auth.currentUser?.uid!],
        });
      });
      setIsFollowing(true);
    }
  }

  return (
    <Button
      onPress={follow_Unfollow_function}
      text={isFollowing ? "Unfollow" : "Follow"}
      style={{
        backgroundColor: isFollowing
          ? colors.follow_unfollow_buttons.unfollow_button
          : colors.follow_unfollow_buttons.follow_button,
      }}
      textStyled={{ color: colors.doneButtonText }}
    />
  );
};

export default Follow_UnfollowButtons;
