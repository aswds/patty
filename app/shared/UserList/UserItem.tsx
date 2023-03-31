import React, { useCallback, useState } from "react";

import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../src/colors";
import UserPicture from "./UserPicture";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FontFamily } from "../../../assets/fonts/Fonts";
import { IUser } from "../../Types/User";
import { ProfileNavigationProps } from "../../Types/ProfileStack/ScreenNavigationProps";
import { Skeleton } from "moti/skeleton";
import Follow_UnfollowButtons from "../../screens/Profile/Follow_UnfollowButtons";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface UserItemProps {
  _user: IUser;
}
const UserItem = ({ _user }: UserItemProps) => {
  const navigation = useNavigation<ProfileNavigationProps>();
  const [show, setShow] = useState<boolean>(true);
  const [user, setUser] = useState<IUser>(_user);
  const { uid } = useTypedSelector((state) => state.user_state.current_user);

  const updateUser = (newUser: Pick<IUser, "following" | "followers">) => {
    setUser({
      ...user,
      ...newUser,
    });
  };
  useFocusEffect(
    useCallback(() => {
      setUser(_user);
    }, [])
  );

  function UserName({ show }: { show: boolean }) {
    const style = { padding: { marginVertical: show ? 5 : 0 } };
    return (
      <View style={styles.userNameContainer}>
        <View style={style.padding}>
          <Skeleton show={show} width={"110%"}>
            <Text style={styles.textStyle} numberOfLines={2}>
              {user?.name} {user?.surname}
            </Text>
          </Skeleton>
        </View>

        <Skeleton show={show}>
          <View>
            <Text style={styles.usernameTextStyle}>@{user?.username}</Text>
          </View>
        </Skeleton>
      </View>
    );
  }
  function YouText() {
    return (
      <Text style={[styles.usernameTextStyle, { fontFamily: FontFamily.bold }]}>
        You
      </Text>
    );
  }
  function onPress() {
    navigation.navigate("ProfileNav", {
      screen: "Profile",
      params: { current_user: user },
    });
  }
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.innerContainer}>
        <UserPicture userImage={user?.image} show={show} setShow={setShow} />

        <View style={styles.textContainer}>
          <View style={styles.topTextContainer}>
            <UserName show={show} />
            {user.uid != uid ? (
              <Follow_UnfollowButtons user={user} updateUser={updateUser} />
            ) : (
              <YouText />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderRadius: 25,
    width: "100%",
    alignSelf: "center",
  },
  innerContainer: {
    alignItems: "center",

    flexDirection: "row",
    margin: "5%",
  },
  textStyle: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    color: colors.text,
  },
  topTextContainer: {
    maxWidth: "90%",
    width: Dimensions.get("window").width / 1.3,
    marginBottom: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  textContainer: {
    marginHorizontal: 10,
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    backgroundColor: colors.text,
  },
  userNameContainer: {
    maxWidth: "50%",
  },
  usernameTextStyle: {
    fontFamily: FontFamily.regular,
    color: colors.iconColor,
  },
});

export default UserItem;
