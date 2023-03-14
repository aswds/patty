import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import MapView, { Region } from "react-native-maps";
import GooglePlaceSearch from "../../../shared/Searcher/GooglePlaceSearch";
import AddressTitle from "./components/AddressTitle";
import ChooseLocationButton from "./components/ChooseLocationButton";
import FakeMarker from "./components/Marker";
import { getAddress } from "../../../shared/GetLocationFunctions/getAddress";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ICoordinates, IFullAddress } from "../../../Types/Events";
import { ChooseLocationScreenNavigationProps } from "../../../Types/MapStack/ScreenNavigationProps";
import { BackButton } from "../../../shared/Buttons/BackButton";

const mapStyle = require("../mapStyle.json");
export default function ChooseLocation({
  route,
  navigation,
}: ChooseLocationScreenNavigationProps) {
  const [region, setRegion] = useState<ICoordinates>();
  const [addressInfo, setAddressInfo] = useState<IFullAddress>();
  const { userLocation } = route?.params;
  const insets = useSafeAreaInsets();
  function onRegionChange(region: ICoordinates) {
    setRegion(region);

    getAddress(region.latitude, region.longitude)
      .then((res) => {
        setAddressInfo(res);
      })
      .catch((e) => setAddressInfo(e));
  }

  return (
    <View style={[styles.container]}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <MapView
            provider={"google"}
            customMapStyle={mapStyle}
            style={{ flex: 1 }}
            showsUserLocation
            showsMyLocationButton
            onRegionChangeComplete={onRegionChange}
            initialRegion={userLocation as Region}
          />
          <GooglePlaceSearch
            style={[styles.googlePlaceSearchStyle, { paddingTop: insets.top }]}
          />
          <BackButton
            navigation={navigation}
            style={{ marginTop: insets.top, backgroundColor: "", left: 0 }}
          />
          <FakeMarker />
          <AddressTitle Address={addressInfo?.Label} />
          <ChooseLocationButton region={region} fullAddress={addressInfo} />
        </View>
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
