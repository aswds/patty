import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  UIManager,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { MapStackScreenProps } from "../../Types/MapStack/ScreenNavigationProps";
import { IEvent } from "../../Types/Events";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../src/colors";
import _ from "lodash";
import { PartyNavigationScreenProps } from "../../Types/PartyStack/NavigationTypes";
import PostForm from "./components/Moments";
import ImageWithEmojiUI from "./components/PostFlatlist/Post/Post";
import { image } from "../../../assets/images";
import { isAndroid } from "../../src/platform";
import PartyHeader from "./components/PostFlatlist/PartyHeader";
import Button from "../../shared/Buttons/Button";
import { posts } from "./photoURLs";
const PartyScreen = ({
  navigation,
  route,
}: PartyNavigationScreenProps<"PartyScreen">) => {
  const [party] = useState<IEvent>(route.params.partyData);
  const [songs, setSongs] = useState();

  const insets = useSafeAreaInsets();
  if (isAndroid && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ImageWithEmojiUI item={item} />}
        ListHeaderComponent={
          <PartyHeader
            navigation={navigation}
            party={party}
            trackInfo={songs}
          />
        }
        style={styles.container}
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingHorizontal: 20,
          paddingBottom: insets.bottom,
        }}
        initialNumToRender={5}
        windowSize={5}
        maxToRenderPerBatch={5}
      />
    </View>
  );
};

export default PartyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
