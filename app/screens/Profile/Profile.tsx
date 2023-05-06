import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import Screen from "./components/Screen";
import RenderItem from "./components/RenderItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Loader from "../../shared/Loaders/Loader";
import User from "./components/HeaderComponent/User";
import { IUser } from "../../Types/User";
import CustomRefreshControl from "../../shared/RefreshControl/RefreshControl";
import { BackButton } from "../../shared/Buttons/BackButton";
import { isAndroid } from "../../src/platform";
import { ProfileStackScreenNavigationProps } from "../../Types/ProfileStack/ScreenNavigationProps";

function Profile({
  navigation,
  route,
}: ProfileStackScreenNavigationProps<"Profile">) {
  const { current_user } = route.params;

  const [user, setUser] = useState<IUser>(current_user!);
  const updateUser = (newUser: Pick<IUser, "following" | "followers">) => {
    setUser({ ...user, ...newUser });
  };
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();
  if (!user) {
    return <Loader isVisible={Boolean(user)} />;
  }

  useEffect(() => {
    setUser(current_user!);
  }, [current_user]);
  console.log(current_user?.image);
  //https://reactjs.org/docs/context.html !!!
  return (
    <Screen>
      <FlatList
        style={styles.container}
        refreshControl={
          <CustomRefreshControl
            setRefreshing={setRefreshing}
            refreshing={refreshing}
          />
        }
        contentContainerStyle={{ paddingTop: insets.top }}
        ListHeaderComponent={
          <User
            user={user}
            updateUser={updateUser}
            backButton={
              <BackButton
                navigation={navigation}
                style={styles.backButtonStyle}
                // onPress={onPress}
              />
            }
          />
        }
        data={[user.events]}
        renderItem={({ item }) => {
          return <RenderItem events={item} />;
        }}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  backButtonStyle: {
    position: "relative",
    left: isAndroid ? -15 : 0,
  },
});
export default Profile;
