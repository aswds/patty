import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import PartyMarkerModal from "./PartyModal/PartyMarkerModal";
import { connect } from "react-redux";
import { fetch_parties } from "../../redux/actions/Parties";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import useUserLocation from "../../hooks/useUserLocation/useUserLocation";
import Loader from "../../shared/Loaders/Loader";
import CustomMarker from "./components/Markers/CustomMarker";
import type { IDoc } from "../../Types/Type";
import { MapScreenNavigationProps } from "../../Types/MapStack/ScreenNavigationProps";
import Buttons from "./components/Buttons/Buttons";

const mapStyle = require("./mapStyle.json");

function Map({ navigation }: MapScreenNavigationProps) {
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [markerInfo, setMarkerInfo] = useState<IDoc>();
  const { userLocation, parties, isLoading } = useUserLocation();

  const mapRef = useRef<MapView | null>(null);

  return (
    <View style={styles.container}>
      {isLoading && <Loader isVisible={isLoading} />}
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

      <Buttons
        onPressPartyCreationButton={() => {
          navigation.navigate("PartyCreationStack", {
            screen: "GeneralInformation",
          });
        }}
        onPressSearchPartyButton={() => {}}
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
