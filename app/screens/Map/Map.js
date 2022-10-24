import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MapView from "react-native-maps";
const styledMap = require("./styledMap.json");
export default function Map() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.container}
        mapType={Platform.OS == "android" ? "none" : "standard"}
        provider={"google"}
        customMapStyle={styledMap}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
