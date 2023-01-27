import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { colors } from "../../../../src/colors";
import LocationAddButton from "./LocationAddButton";
import { Title } from "./TagList";
import { MaterialIcons } from "@expo/vector-icons";
const styledMap = require("../../styledMap.json");
const mapStyle = require("../../mapStyle.json");
export default function Location(props) {
  const route = useRoute();
  const { setLocation } = props;

  // function Map() {
  //   return (
  //
  //   );
  // }

  function TitleIcon() {
    return (
      <View style={{ marginBottom: 5 }}>
        <MaterialIcons
          name="add-location-alt"
          size={25}
          color={colors.iconColor}
          style={{}}
        />
      </View>
    );
  }

  function Address() {
    return (
      <View style={styles.locationTitleContainer}>
        <Text style={styles.locationAddressStyle}>{route.params?.address}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "flex-start" }}>
        <Title title={"Location"} icon={<TitleIcon />} />
      </View>
      <View style={styles.map}>
        <MapView
          style={{ flex: 1 }}
          region={{
            ...props?.userLocation,
            ...route.params?.region,
            longitudeDelta: 0.003,
            latitudeDelta: 0.003,
          }}
          provider="google"
          pointerEvents="none"
          customMapStyle={mapStyle}
        >
          {route.params?.region && <Marker coordinate={route.params?.region} />}
        </MapView>
      </View>
      <Address />
      {props.locationAddButton}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,

    height: 370,
    width: "100%",
  },
  map: {
    height: "60%",
    width: "100%",
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 1,
    alignSelf: "center",
  },
  locationTitleContainer: {
    marginVertical: 10,
  },
  locationAddressStyle: {
    fontFamily: "WorkSans-Bold",
    textAlign: "center",
    color: colors.text,
  },
});
