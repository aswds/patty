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
import ImageWithEmojiUI from "./components/PostFlatlist/Post";
import { image } from "../../../assets/images";
import { isAndroid } from "../../src/platform";
import PartyHeader from "./components/PostFlatlist/PartyHeader";
import Button from "../../shared/Buttons/Button";
const PartyScreen = ({
  navigation,
  route,
}: PartyNavigationScreenProps<"PartyScreen">) => {
  const [party] = useState<IEvent>(route.params.partyData);
  const [songs, setSongs] = useState();
  const [data, setData] = useState(
    Array.from({ length: 100 }, (_, i) => ({
      id: i,
      image: image.noImage,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    }))
  );

  const insets = useSafeAreaInsets();
  if (isAndroid && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ImageWithEmojiUI
            imageSource={item.image}
            description={item.description}
          />
        )}
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
