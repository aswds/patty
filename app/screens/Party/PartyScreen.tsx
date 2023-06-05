import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  UIManager,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MapStackScreenProps } from "../../Types/MapStack/ScreenNavigationProps";
import { IEvent } from "../../Types/Events";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../src/colors";
import _ from "lodash";
import { PartyNavigationScreenProps } from "../../Types/PartyStack/NavigationTypes";
import PostForm from "./components/Moments";
import Post from "./components/PostFlatlist/Post/Post";
import { image } from "../../../assets/images";
import { isAndroid } from "../../src/platform";
import PartyHeader from "./components/PostFlatlist/PartyHeader";
import Button from "../../shared/Buttons/Button";
import { fetchPartyPosts } from "./helpers/fetchPartyPosts";
import CustomRefreshControl from "../../shared/RefreshControl/RefreshControl";
import { IPost } from "./components/PostFlatlist/types";
const PartyScreen = ({
  navigation,
  route,
}: PartyNavigationScreenProps<"PartyScreen">) => {
  const [party] = useState<IEvent>(route.params.partyData);
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const insets = useSafeAreaInsets();
  if (isAndroid && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  useEffect(() => {
    if (party.partyID)
      fetchPartyPosts(party.partyID).then((posts) => setPosts(posts));
  }, [party.partyID, refreshing]);
  const addPostButtonHeight = 60;
  const bottomPadding = insets.bottom + addPostButtonHeight;
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        keyExtractor={(item: IPost, index) => index.toString()}
        renderItem={({ item }) => <Post item={item} />}
        ListHeaderComponent={
          <PartyHeader navigation={navigation} party={party} />
        }
        refreshControl={
          <CustomRefreshControl
            setRefreshing={setRefreshing}
            refreshing={refreshing}
          />
        }
        style={styles.container}
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingHorizontal: 20,
          paddingBottom: bottomPadding,
        }}
        initialNumToRender={5}
        windowSize={5}
        maxToRenderPerBatch={5}
      />
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          justifyContent: "space-evenly", // Align buttons in the center
          bottom: insets.bottom,
          width: "100%",
        }}
      >
        <Button
          style={styles.buttonStyle}
          text="Add post"
          onPress={() => navigation.navigate("PostUploadScreen")}
        />
        <Button
          style={styles.buttonStyle}
          textStyled={{
            textAlign: "center",
          }}
          text="Check mingles"
          onPress={() => navigation.navigate("PostUploadScreen")}
        />
      </View>
    </View>
  );
};

export default PartyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  buttonStyle: {
    height: 60,
    borderWidth: 2,
    borderColor: colors.accentColor,
    borderStyle: "dashed",
    // backgroundColor: colors.doneButtonBG,
  },
});
