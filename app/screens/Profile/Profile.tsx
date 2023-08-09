import { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProfileStackScreenNavigationProps } from "../../Types/ProfileStack/ScreenNavigationProps";
import { IUser } from "../../Types/User";
import { BackButton } from "../../shared/Buttons/BackButton";
import Loader from "../../shared/Loaders/Loader";
import { onRefresh } from "../../shared/RefreshControl/refreshControlFuncs";
import { colors } from "../../src/colors";
import { isAndroid } from "../../src/platform";
import User from "./components/HeaderComponent/User";
import RenderItem from "./components/RenderItem";
import Screen from "./components/Screen";

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
  }, [route.params.current_user]);
  //https://reactjs.org/docs/context.html !!!
  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <FlatList
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh.bind(null, setRefreshing)}
              tintColor={colors.buttonText}
              style={{ alignItems: "flex-end" }}
            />
          }
          contentContainerStyle={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }}
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
          data={[
            {
              data: `${user.events.eventsCreated} ${
                user.events.eventsCreated > 0 ? "🥳" : ""
              }`,
              title: "number of parties created ",
            },
            {
              data: `${user.events.eventsVisited} ${
                user.events.eventsVisited > 0 ? "🎉" : ""
              }`,
              title: "party count ",
            },
            {
              data: user.events.onEvent
                ? "living it up at the party 🎉🕺"
                : "just chillin' and relaxing 🍹",
              title: `party presence profiler`,
            },
          ]}
          renderItem={({ item }) => {
            return <RenderItem eventInfo={item} />;
          }}
        />
      </View>
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
