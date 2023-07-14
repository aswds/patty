import _ from "lodash";
import { useRef, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ICoordinates, IFullAddress } from "../../../../Types/Events";
import { PartyCreationStackScreenProps } from "../../../../Types/MapStack/ScreenNavigationProps";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { getAddress } from "../../../../shared/GetLocationFunctions/getAddress";
import GooglePlaceSearch from "../../../../shared/Searcher/GooglePlaceSearch";
import AddressTitle from "./components/AddressTitle";
import ChooseLocationButton from "./components/ChooseLocationButton";
import FakeMarker from "./components/Marker";

export default function ChooseLocation({}: PartyCreationStackScreenProps<"ChooseLocation">) {
  const [region, setRegion] = useState<ICoordinates>();
  const [addressInfo, setAddressInfo] = useState<IFullAddress | null>();
  const { userLocation } = useTypedSelector(
    (state) => state.user_state.current_user
  );
  const mapRef = useRef<MapView>(null);
  const insets = useSafeAreaInsets();

  function onRegionChange(region: ICoordinates) {
    setRegion(region);
    getAddress(region.latitude, region.longitude)
      .then((res) => {
        if (!_.isEmpty(res)) {
          setAddressInfo({
            ...res!,
            label: res.label,
            partyLocation: `${res?.countryName}_${res?.county}_${res?.city}`,
          });
        }
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
            showOutsideCityError={
              addressInfo?.partyLocation != userLocation?.partyLocation
            }
          />

          <ChooseLocationButton
            region={region}
            fullAddress={addressInfo}
            outsideCity={
              addressInfo?.partyLocation != userLocation?.partyLocation
            }
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
