import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import useUserLocation from "../../hooks/useUserLocation";
import { colors } from "../../src/colors";
import Loader from "../Register_LogIn/components/Loader";
import DoPartyButton from "./components/DoPartyButton";
import { getUserLocation } from "./components/getUserLocation";
import PartyModal from "./components/PartyModal";
const styledMap = require("./styledMap.json");
const mapStyle = require("./mapStyle.json");
export default function Map() {
  const [markers, setMarkers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const [userLocation, setUserLocation] = useState(null);
  const navigation = useNavigation();

  function hideModal() {
    setShowModal(!showModal);
  }
  const { userLocation, errorMsg, isLoading } = useUserLocation();

  return (
    <View style={styles.container}>
      {isLoading && <Loader isVisible={isLoading} />}
      <MapView
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        initialRegion={userLocation}
        // onMapLoaded={se}
        showsUserLocation
        paddingAdjustmentBehavior="always"
        onPress={(r) => {
          setMarkers([...markers, r.nativeEvent?.coordinate]);
        }}
      >
        {markers.map((marker, index) => {
          return (
            <Marker
              coordinate={{
                longitude: marker.longitude,
                latitude: marker.latitude,
                latitudeDelta: 0,
                longitudeDelta: 0,
              }}
              key={index}
            >
              <FontAwesome5
                name="fire-alt"
                size={30}
                color={colors.accentColor}
              />
            </Marker>
          );
        })}
      </MapView>
      <Callout style={styles.buttonsContainer}>
        <DoPartyButton
          onPress={() => {
            navigation.navigate("PartyCreationScreen", {
              userLocation: userLocation,
            });
          }}
        />
      </Callout>

      <PartyModal showModal={showModal} hideModal={hideModal} />
    </View>
  );
}
const styles = StyleSheet.create({
  buttonsContainer: {
    alignSelf: "center",
    position: "absolute",
    bottom: "20%",
  },
  button: {
    height: "70%",
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  container: {
    flex: 1,
  },
});
