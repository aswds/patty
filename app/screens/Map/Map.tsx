import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import PartyMarkerModal from "./components/Modals/PartyModal/PartyMarkerModal";
import useUserLocation from "../../hooks/useUserLocation/useUserLocation";
import CustomMarker from "./components/Markers/CustomMarker";
import type { IDoc } from "../../Types/Parties";
import { MapScreenNavigationProps } from "../../Types/MapStack/ScreenNavigationProps";
import Buttons from "./components/Buttons/Buttons";
import Loader from "../../shared/Loaders/Loader";
import ProfileButton from "./components/ProfileButton";
import { RootState } from "../../redux/store/store";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IModals } from "../../Types/Map";
import FavoriteModal from "./components/Modals/SelectedModal/SelectedModal";

const mapStyle = require("./mapStyle.json");
interface MapProps extends MapScreenNavigationProps {}

function Map({ navigation }: MapProps) {
  const [visibleModal, setVisibleModal] = useState<IModals>({
    FavoriteModal: false,
    partyMarkerModal: false,
    searchModal: false,
  });

  const [markerInfo, setMarkerInfo] = useState<IDoc>();
  const { userLocation, parties, isLoading } = useUserLocation();
  const { fetch_user } = useActions();
  const mapRef = useRef<MapView | null>(null);
  const { current_user } = useTypedSelector((state) => state.user_state);

  useEffect(() => {
    fetch_user();
  }, []);

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
                setVisibleModal({ ...visibleModal, partyMarkerModal: true });
                setMarkerInfo(doc);
                mapRef?.current?.animateToRegion(
                  doc?.location?.region as Region
                );
              }}
              key={index}
            />
          );
        })}
      </MapView>
      <ProfileButton
        current_user={current_user}
        onLongPress={() =>
          mapRef?.current?.animateToRegion(userLocation as Region)
        }
      />
      <Buttons
        onPressPartyCreationButton={() => {
          navigation.navigate("PartyCreationStack", {
            screen: "GeneralInformation",
          });
        }}
        onPressSearchPartyButton={() => {}}
        onPressMoreButton={() => {
          setVisibleModal({ ...visibleModal, FavoriteModal: true });
        }}
      />
      <FavoriteModal
        visible={visibleModal.FavoriteModal}
        hideModal={() => {
          setVisibleModal({ ...visibleModal, FavoriteModal: false });
        }}
      />
      <PartyMarkerModal
        hideModal={() => {
          setVisibleModal({ ...visibleModal, partyMarkerModal: false });
        }}
        visible={visibleModal.partyMarkerModal}
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

const mapStateToProps = (store: RootState) => ({
  current_user: store.user_state.current_user,
  isPartiesLoading: store.parties_state.isLoading,
  parties: store.parties_state.parties,
});
export default Map;
