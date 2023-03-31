import React, { useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";

import Screen from "./components/Screen";
import RenderItem from "./components/RenderItem";
import { colors } from "../../src/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { onRefresh } from "../../shared/RefreshControl/refreshControlFuncs";
import Loader from "../../shared/Loaders/Loader";
import User from "./components/HeaderComponent/User";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ProfileScreenRouteProps } from "../../Types/ProfileStack/RouteTypes";
import { IUser } from "../../Types/User";
import CustomRefreshControl from "../../shared/RefreshControl/RefreshControl";
import { ProfileScreenNavigationProps } from "../../Types/ProfileStack/ScreenNavigationProps";
import { BackButton } from "../../shared/Buttons/BackButton";
import { isAndroid } from "../../src/platform";
import { MapNavigationProps } from "../../Types/MapStack/ScreenNavigationProps";
import { MapNavNavigatorParamList } from "../../Types/MapStack/NavigationTypes";

function Profile({ navigation, route }: ProfileScreenNavigationProps) {
  const { current_user, previous_screen } = route.params;
  const navigationMap = useNavigation<MapNavNavigatorParamList>();
  const [user, setUser] = useState<IUser>(current_user!);
  const updateUser = (newUser: Pick<IUser, "following" | "followers">) => {
    setUser({ ...user, ...newUser });
  };
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();
  if (!user) {
    return <Loader isVisible={Boolean(user)} />;
  }
  function onPress() {
    if (previous_screen === "Guests") {
    } else {
      return;
    }
  }
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
                onPress={onPress}
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
    marginBottom: 20,
  },
});
export default Profile;
