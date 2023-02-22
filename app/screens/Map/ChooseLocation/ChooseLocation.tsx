import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import MapView from "react-native-maps";
import GooglePlaceSearch from "../../../shared/Searcher/GooglePlaceSearch";
import AddressTitle from "./components/AddressTitle";
import ChooseLocationButton from "./components/ChooseLocationButton";
import FakeMarker from "./components/Marker";
import { getAddress } from "../../../shared/GetLocationFunctions/getAddress";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ICoordinates, IFullAddress } from "../../../Types/Type";
import { ChooseLocationScreenNavigationProps } from "../../../Types/MapStack/ScreenNavigationProps";

const mapStyle = require("../mapStyle.json");
export default function ChooseLocation({
  route,
}: ChooseLocationScreenNavigationProps) {
  const [region, setRegion] = useState<ICoordinates>();
  const [addressInfo, setAddressInfo] = useState<IFullAddress>();
  const { userLocation } = route.params;
  const insets = useSafeAreaInsets();
  function onRegionChange(region: ICoordinates) {
    getAddress(region.latitude, region.longitude)
      .then((res) => {
        setAddressInfo(res);
      })
      .catch((e) => setAddressInfo(e));
    setRegion(region);
  }
  return (
    <View style={[styles.container, {}]}>
      <TouchableWithoutFeedback>
        <>
          <MapView
            provider={"google"}
            customMapStyle={mapStyle}
            style={{ flex: 1 }}
            showsUserLocation
            showsMyLocationButton
            onRegionChangeComplete={onRegionChange}
            initialRegion={userLocation}
          />
          <GooglePlaceSearch
            style={[styles.googlePlaceSearchStyle, { paddingTop: insets.top }]}
          />
          <FakeMarker />
          <AddressTitle Address={addressInfo?.Label} />
          <ChooseLocationButton region={region} address={addressInfo} />
        </>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //make map container
    flex: 1,
    overflow: "hidden",
  },
  googlePlaceSearchStyle: {},
});
