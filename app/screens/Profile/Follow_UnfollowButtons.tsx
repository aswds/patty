import { useEffect, useState } from "react";
import { auth } from "../../../firebase";
import { IUser } from "../../Types/User";
import { removeItemOnce } from "../../helpers/removeItemOnce";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Button from "../../shared/Buttons/Button";
import { colors } from "../../src/colors";
import { followUser } from "../Map/Firebase/followUser";
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
        console.log({
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
