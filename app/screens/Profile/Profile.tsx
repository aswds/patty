import React, { useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";

import Screen from "./components/Screen";
import RenderItem from "./components/RenderItem";
import { colors } from "../../src/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { onRefresh } from "./refreshControlFuncs";
import Loader from "../../shared/Loaders/Loader";
import User from "./components/HeaderComponent/User";
import { useRoute } from "@react-navigation/native";
import { ProfileScreenRouteProps } from "../../Types/ProfileStack/RouteTypes";
import { IUser } from "../../Types/User";

function Profile() {
  const route = useRoute<ProfileScreenRouteProps>();
  const { current_user } = route.params;
  console.log(current_user);
  const [user, setUser] = useState<IUser>(current_user!);
  const updateUser = (newUser: Pick<IUser, "following" | "followers">) => {
    setUser({ ...user, ...newUser });
  };

  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();
  if (!user) {
    return <Loader isVisible={Boolean(user)} />;
  }
  //https://reactjs.org/docs/context.html !!!
  return (
    <Screen>
      <FlatList
        style={styles.container}
        refreshControl={
          <View style={{}}>
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh.bind(null, setRefreshing)}
              tintColor={colors.buttonText}
              style={{ alignItems: "center", zIndex: 1 }}
            />
          </View>
        }
        contentContainerStyle={{ paddingTop: insets.top }}
        ListHeaderComponent={<User user={user} updateUser={updateUser} />}
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
});
export default Profile;
