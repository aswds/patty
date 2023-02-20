import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import DoPartyButton from "./components/DoPartyButton";
import PartyMarkerModal from "./PartyModal/PartyMarkerModal";
import { connect } from "react-redux";
import { fetch_parties } from "../../redux/actions/Parties";
import { bindActionCreators } from "redux";
import useUserLocation from "../../hooks/useUserLocation/useUserLocation";
import Loader from "../../shared/Loaders/Loader";
import ProfileButton from "./components/ProfileButton";
import CustomMarker from "./components/Markers/CustomMarker";

const mapStyle = require("./mapStyle.json");
function Map({ navigation }) {
  const [markers, setMarkers] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [markerInfo, setMarkerInfo] = useState();
  const { userLocation, parties, isLoading } = useUserLocation();

  const mapRef = useRef(null);
  return (
    <View style={styles.container}>
      {isLoading && <Loader isVisible={isLoading} />}
      <MapView
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        initialRegion={userLocation}
        userLocationPriority={"low"}
        showsBuildings={true}
        loadingEnabled={true}
        showsUserLocation
        paddingAdjustmentBehavior="always"
        onPress={(r) => {
          setMarkers([...markers, r.nativeEvent?.coordinate]);
        }}
        ref={mapRef}
      >
        {parties?.map((doc, index) => {
          return (
            <CustomMarker
              doc={doc}
              index={index}
              onPress={() => {
                setVisibleModal(true);
                setMarkerInfo(doc);
                mapRef.current.animateToRegion(doc?.location?.region);
              }}
              key={index}
            />
          );
        })}
      </MapView>

      <ProfileButton />

      <DoPartyButton
        onPress={() => {
          navigation.navigate("PartyCreationScreen", {
            userLocation: userLocation,
          });
        }}
      />
      <PartyMarkerModal
        hideModal={() => {
          setVisibleModal(false);
        }}
        visible={visibleModal}
        markerInfo={markerInfo}
      />
    </View>
  );
}
const styles = StyleSheet.create({
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
  loaderStyle: { height: 100, zIndex: -1 },
});

const mapDispatchProps = (dispatch) => {
  return bindActionCreators({ fetch_parties }, dispatch);
};
const mapStateToProps = (store) => ({
  isPartiesLoading: store.parties_state.isLoading,
  parties: store.parties_state.parties,
});
export default connect(mapStateToProps, mapDispatchProps)(Map);
