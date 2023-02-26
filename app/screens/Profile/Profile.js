import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetch_user } from "../../redux/actions/User";
import Screen from "./components/Screen";
import RenderItem from "./components/RenderItem";
import { colors } from "../../src/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { onRefresh } from "./refreshControlFuncs";
import Loader from "../../shared/Loaders/Loader";
import User from "./components/HeaderComponent/User";

function Profile(props) {
  const { current_user, fetch_user } = props;
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();
  useEffect(() => {}, []);
  if (!current_user) {
    return <Loader isVisible />;
  }
  //https://reactjs.org/docs/context.html !!!
  return (
    <Screen>
      <FlatList
        style={{ flex: 1 }}
        refreshControl={
          <View style={{ marginTop: insets.top }}>
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh.bind(null, setRefreshing)}
              tintColor={colors.buttonText}
              style={{ alignItems: "center", zIndex: 1 }}
            />
          </View>
        }
        ListHeaderComponent={<User user={current_user} />}
        data={[current_user]}
        renderItem={(item) => {
          return <RenderItem item={item} />;
        }}
      />
    </Screen>
  );
}
const mapDispatchProps = (dispatch) => {
  return bindActionCreators({ fetch_user }, dispatch);
};
const mapStateToProps = (store) => ({
  current_user: store.user_state.current_user,
  isLoading: store.user_state.isLoading,
  posts: store.user_state.posts,
  following: store.user_state.following,
  followers: store.user_state.followers,
});
export default connect(mapStateToProps, mapDispatchProps)(Profile);
