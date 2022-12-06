import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
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
export default function Map() {
  const [markers, setMarkers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [mapRegion, setMapRegion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [focusedButton, setFocusedButton] = useState({
    doPartyButton: true,
    searchButton: false,
  });

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
          mapType={Platform.OS == "android" ? "none" : "standard"}
          provider={"google"}
          customMapStyle={styledMap}
          initialRegion={mapRegion}
          // initialRegion={{
          //   longitude: location.coords.longitude,
          //   latitude: location.coords.latitude,
          //   latitudeDelta: 0,
          //   longitudeDelta: -0.01,
          // }}
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
                image={require("../../../assets/images/pattyLogo2.png")}
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
          styles={styles}
          isFocused={focusedButton.doPartyButton}
          onPress={() => {
            setFocusedButton({
              searchButton: false,
              doPartyButton: true,
            });
            // setShowModal(true);
          }}
        />

        <SearchButton
          isFocused={focusedButton.searchButton}
          onPress={() => {
            setFocusedButton({
              searchButton: true,
              doPartyButton: false,
            });
          }}
          styles={styles}
        />
      </Callout>

      <PartyModal showModal={showModal} hideModal={hideModal} />
    </View>
  );
}
const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: colors.background,
    bottom: "20%",
    height: "8%",
    width: "60%",
    borderRadius: 20,

    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowColor: isAndroid ? "white" : "rgba(0, 0, 0, 0.7)",
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
