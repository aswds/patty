import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import GooglePlaceSearch from "../components/GooglePlaceSearch";
import AddressTitle from "./components/AddressTitle";
import ChooseLocationButton from "./components/ChooseLocationButton";
import FakeMarker from "./components/Marker";
import { getAddress } from "./getAddress";
import Loader from "../../Register_LogIn/components/Loader";
import useUserLocation from "../../../hooks/useUserLocation";

const mapStyle = require("../mapStyle.json");
export default function ChooseLocation() {
  const [region, setRegion] = useState();
  const [addressInfo, setAddressInfo] = useState({});
  const { userLocation, errorMsg, isLoading } = useUserLocation();
  function onRegionChange(region) {
    getAddress(region.latitude, region.longitude)
      .then((res) => {
        setAddressInfo(res);
      })
      .catch((e) => setAddressInfo(e));
    setRegion(region);
  }
  return (
    <View style={styles.container}>
      {/*<SafeAreaView style={styles.safeAreaStyle}>*/}
      {isLoading && <Loader isVisible={isLoading} />}
      <MapView
        provider={"google"}
        customMapStyle={mapStyle}
        style={{ flex: 1 }}
        showsUserLocation
        showsMyLocationButton
        onRegionChangeComplete={onRegionChange}
        initialRegion={userLocation}
      />
      <GooglePlaceSearch style={[styles.googlePlaceSearchStyle]} />
      <FakeMarker />
      <AddressTitle Address={addressInfo.Label} />
      <ChooseLocationButton region={region} address={addressInfo.Label} />
      {/*</SafeAreaView>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //make map container
    flex: 1,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    overflow: "hidden",
  },
  googlePlaceSearchStyle: {},
});
