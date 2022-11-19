import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch, connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetch_user } from "../../redux/actions/User";
import { auth } from "../../../firebase";
import Follower_info from "./components/Follower_info";
import Screen from "./components/Screen";
import Loader from "./components/Loader";
import Header from "./components/Header";
import RenderItem from "./components/RenderItem";
function Profile(props) {
  useEffect(() => {
    props.fetch_user();
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const { current_user } = props;
  const [user, setUser] = useState(current_user);
  if (!current_user) {
    return <Loader />;
  }
  return (
    <Screen>
      {isLoading && <Loader />}
      <FlatList
        style={{ flex: 1 }}
        ListHeaderComponent={
          <View style={{ height: Dimensions.get("window").height * 0.5 }}>
            <Header user={current_user} setIsLoading={setIsLoading} />
            <Follower_info />
          </View>
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
  posts: store.user_state.posts,
  following: store.user_state.following,
  followers: store.user_state.followers,
});
export default connect(mapStateToProps, mapDispatchProps)(Profile);
