import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import DoPartyButton from "./components/DoPartyButton";
import PartyMarkerModal from "./PartyModal/PartyMarkerModal";
import { connect } from "react-redux";
import { fetch_parties } from "../../redux/actions/Parties";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import useUserLocation from "../../hooks/useUserLocation/useUserLocation";
import Loader from "../../shared/Loaders/Loader";
import ProfileButton from "./components/ProfileButton";
import CustomMarker from "./components/Markers/CustomMarker";
import type { IDoc } from "../../Types/Type";

const mapStyle = require("./mapStyle.json");

function Map({}) {
  const [visibleModal, setVisibleModal] = useState(false);
  const [showSheet, setShowSheet] = useState(true);
  const [markerInfo, setMarkerInfo] = useState<IDoc>();

  const { userLocation, parties, isLoading } = useUserLocation();

  const mapRef = useRef<MapView | null>(null);

  return (
    <View style={styles.container}>
      {isLoading && (
        <Loader
          isVisible={isLoading}
          style={undefined}
          containerStyle={undefined}
        />
      )}
      <MapView
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        initialRegion={userLocation as Region}
        userLocationPriority={"low"}
        showsBuildings={true}
        loadingEnabled={true}
        showsUserLocation
        paddingAdjustmentBehavior="always"
        ref={mapRef}
      >
        {parties?.map((doc: IDoc, index: React.Key | null | undefined) => {
          return (
            <CustomMarker
              doc={doc}
              index={index}
              onPress={() => {
                setVisibleModal(true);
                setMarkerInfo(doc);
                mapRef?.current?.animateToRegion(doc?.location?.region);
              }}
              key={index}
            />
          );
        })}
      </MapView>

      <ProfileButton />

      <DoPartyButton
        onPress={() => {
          // navigation.navigate("PartyCreationScreen", {
          //   userLocation: userLocation,
          // });
        }}
      />
      {/*<DraggableBottomSheet ref={ref} />*/}
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

const mapDispatchProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators({ fetch_parties }, dispatch);
};
const mapStateToProps = (store: {
  parties_state: { isLoading: any; parties: any };
}) => ({
  isPartiesLoading: store.parties_state.isLoading,
  parties: store.parties_state.parties,
});
export default connect(mapStateToProps, mapDispatchProps)(Map);
