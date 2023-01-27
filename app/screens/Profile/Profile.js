import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetch_user } from "../../redux/actions/User";
import Screen from "./components/Screen";
import Loader from "./components/Loader";
import Header from "./components/Header";
import RenderItem from "./components/RenderItem";
import { colors } from "../../src/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { onRefresh } from "./refreshControlFuncs";

function Profile(props) {
  const { current_user, isLoading } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState(current_user);
  const insets = useSafeAreaInsets();
  useEffect(() => {
    props.fetch_user();
    setUser(props.current_user);
  }, []);
  if (!current_user) {
    return <Loader />;
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
        ListHeaderComponent={
          <Header user={current_user} isLoading={isLoading} />
        }
        data={[user]}
        renderItem={(item) => {
          return <RenderItem item={item} />;
        }}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: "35%",
  },
});

const mapDispatchProps = (dispatch) => {
  return bindActionCreators(
    { fetch_user },
    // fetchUserPosts, fetchUserFollowing, fetchUserFollowers
    dispatch
  );
};
const mapStateToProps = (store) => ({
  current_user: store.user_state.current_user,
  isLoading: store.user_state.isLoading,
  posts: store.user_state.posts,
  following: store.user_state.following,
  followers: store.user_state.followers,
});
export default connect(mapStateToProps, mapDispatchProps)(Profile);
