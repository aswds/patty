import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Callout } from "react-native-maps";
import PostModal from "./components/2Mpa";
import DoPartyButton from "./components/DoPartyButton";
import PartyModal from "./components/PartyModal";
const styledMap = require("./styledMap.json");
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
      <Callout style={styles.containerButton}>
        <DoPartyButton
          onPress={() => {
            setShowModal(true);
          }}
        />
      </Callout>
      <PartyModal showModal={showModal} hideModal={hideModal} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerButton: {
    bottom: "15%",
    width: "100%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
});
