import React, { useEffect, useState } from "react";
import { followUser } from "../Map/Firebase/followUser";
import { auth } from "../../../firebase";
import { colors } from "../../src/colors";
import Button from "../../shared/Buttons/Button";
import { IUser } from "../../Types/User";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { unfollowUser } from "../Map/Firebase/unfollowUser";

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
    setIsFollowing(user?.followers.includes(uid!));
  }, []);

  function follow_Unfollow_function() {
    if (isFollowing) {
      const indexToUnfollow = user?.followers.indexOf(auth.currentUser?.uid!);
      unfollowUser(auth.currentUser?.uid!, user.uid!).then(() => {
        if (indexToUnfollow != -1) {
          updateUser({
            ...user,
            followers: [...user?.followers.splice(indexToUnfollow, 0)],
          });
          setIsFollowing(false);
        }
      });
    } else {
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
      style={{ backgroundColor: colors.doneButtonBG }}
      textStyled={{ color: colors.doneButtonText }}
    />
  );
};

export default Follow_UnfollowButtons;
