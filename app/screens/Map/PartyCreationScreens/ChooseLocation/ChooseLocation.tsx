import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import MapView, { PROVIDER_DEFAULT, Region } from "react-native-maps";
import GooglePlaceSearch from "../../../../shared/Searcher/GooglePlaceSearch";
import AddressTitle from "./components/AddressTitle";
import ChooseLocationButton from "./components/ChooseLocationButton";
import FakeMarker from "./components/Marker";
import { getAddress } from "../../../../shared/GetLocationFunctions/getAddress";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ICoordinates, IFullAddress } from "../../../../Types/Events";
import { BackButton } from "../../../../shared/Buttons/BackButton";
import { PartyCreationStackScreenProps } from "../../../../Types/MapStack/ScreenNavigationProps";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { UserLocation } from "../../../../Types/User";
import NavigationBar from "../NavigationBar";

export default function ChooseLocation({
  route,
  navigation,
}: PartyCreationStackScreenProps<"ChooseLocation">) {
  const [region, setRegion] = useState<ICoordinates>();
  const [addressInfo, setAddressInfo] = useState<IFullAddress>();
  const [city, setCity] = useState<UserLocation["city"]>(route.params?.city);

  const mapRef = useRef<MapView>(null);
  const insets = useSafeAreaInsets();
  function onRegionChange(region: ICoordinates) {
    setRegion(region);
    getAddress(region.latitude, region.longitude)
      .then((res) => {
        setAddressInfo(res);
      })
      .catch((e) => setAddressInfo(e));
  }
  function regionUpdate(region: GooglePlaceDetail["geometry"]["location"]) {
    mapRef.current?.animateToRegion({
      latitude: region.lat,
      longitude: region.lng,
      longitudeDelta: 0.001,
      latitudeDelta: 0.001,
    });
  }
  return (
    <View style={[styles.container]}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_DEFAULT}
            style={{ flex: 1 }}
            showsUserLocation
            showsMyLocationButton
            onRegionChangeComplete={onRegionChange}
            ref={mapRef}
            showsCompass={false}
            // initialRegion={userLocation as Region}
          />

          <GooglePlaceSearch
            style={[styles.googlePlaceSearchStyle, { paddingTop: insets.top }]}
            regionUpdate={regionUpdate}
          />
          <FakeMarker />
          <AddressTitle
            Address={addressInfo?.label}
            showOutsideCityError={addressInfo?.city != city}
          />
          <ChooseLocationButton
            region={region}
            fullAddress={addressInfo}
            outsideCity={addressInfo?.city != city}
          />
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
