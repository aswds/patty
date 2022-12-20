import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
} from "react-native";
import MapView, {
  Callout,
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import useUserLocation from "../../hooks/useUserLocation";
import PostModal from "./components/2Mpa";
import DoPartyButton from "./components/DoPartyButton";
import PartyModal from "./components/PartyModal";
import SearchButton from "./components/SearchButton";
import { getUserLocation } from "./components/getUserLocation";
import * as Location from "expo-location";
import Loader from "../Register_LogIn/components/Loader";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../../src/colors";
import { isAndroid } from "../../src/platform";
const styledMap = require("./styledMap.json");
const mapStyle = require("./mapStyle.json");
export default function Map() {
  const [markers, setMarkers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [mapRegion, setMapRegion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // const [location, error, isLoading] = useUserLocation();
  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //   })();
  // }, []);
  function hideModal() {
    setShowModal(!showModal);
  }
  useEffect(() => {
    getUserLocation().then(
      (res) =>
        setMapRegion({
          longitude: res.longitude,
          latitude: res.latitude,
          longitudeDelta: -0.01,
          latitudeDelta: 0,
        }),
      setIsLoading(false)
    );
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loader isVisible={isLoading} />
      ) : (
        <MapView
          style={styles.container}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          initialRegion={mapRegion}
          showsUserLocation
          paddingAdjustmentBehavior="always"
          onPress={(r) => {
            setMarkers([...markers, r.nativeEvent.coordinate]);
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
      )}
      <Callout style={styles.buttonsContainer}>
        <DoPartyButton
          
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
