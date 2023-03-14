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

function Profile() {
  const route = useRoute<ProfileScreenRouteProps>();
  const { current_user } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();
  if (!current_user) {
    return <Loader isVisible />;
  }
  console.log(current_user);
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
        ListHeaderComponent={<User user={current_user} />}
        data={[current_user]}
        renderItem={({ item }) => {
          return <RenderItem user={item} />;
        }}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
});
export default Profile;
