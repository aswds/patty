import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { MapStackScreenProps } from "../../Types/MapStack/ScreenNavigationProps";
import { IEvent } from "../../Types/Events";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../src/colors";
import Header from "./components/Header";
import TrackInfo from "./components/TrackInfo";
import _ from "lodash";
import Announcements from "./components/Announcements";
import Buttons from "../Map/components/Buttons/Buttons";
const PartyScreen = ({ navigation, route }: MapStackScreenProps<"Party">) => {
  const [party] = useState<IEvent>(route.params.partyData);
  const insets = useSafeAreaInsets();
  const trackInfo = {
    title: "Doxy - Remastered",
    artist: "Miles Davis",
    image: "https://i.scdn.co/image/ab67616d00004851cd15b5ceb603b272528323d5",
  };
  return (
    <ScrollView
      style={{
        ...styles.container,
        paddingTop: insets.top,
        paddingHorizontal: 20,
      }}
    >
      <View style={styles.container}>
        <Header navigation={navigation} title={party.title} user={party.user} />
        {/* <CollaborativePlaylistScreen /> */}
        <TrackInfo trackInfo={trackInfo} />
        <Announcements />
        {/* <TrackInfo trackInfo={trackInfo} /> */}
        <View></View>
      </View>
    </ScrollView>
  );
};

export default PartyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
