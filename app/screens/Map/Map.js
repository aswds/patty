import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
} from "react-native";
import MapView, { Callout } from "react-native-maps";
import PostModal from "./components/2Mpa";
import DoPartyButton from "./components/DoPartyButton";
import PartyModal from "./components/PartyModal";
import SearchButton from "./components/SearchButton";
const styledMap = require("./styledMap.json");
const isAndroid = Platform.OS == "android";

export default function Map() {
  const [showModal, setShowModal] = useState(false);
  function hideModal() {
    setShowModal(!showModal);
  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.container}
        mapType={Platform.OS == "android" ? "none" : "standard"}
        provider={"google"}
        customMapStyle={styledMap}
      />
      <SearchButton />
      <DoPartyButton
        onPress={() => {
          setShowModal(true);
        }}
      />

      <PartyModal showModal={showModal} hideModal={hideModal} />
    </View>
  );
}
const styles = StyleSheet.create({
  searchButtonContainer: {},
  container: {
    flex: 1,
  },
});
