import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import MapView, { PROVIDER_DEFAULT, Region } from "react-native-maps";
import PartyModal from "../Modals/PartyModal/PartyModal";
import type { IEvent } from "../../Types/Events";
import { MapStackScreenProps } from "../../Types/MapStack/ScreenNavigationProps";
import Buttons from "./components/Buttons/Buttons";
import ProfileButton from "./components/ProfileButton";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import CustomMarker from "./components/Markers/CustomMarker";
import BottomSheet from "@gorhom/bottom-sheet";
import useUserLocation from "../../hooks/useUserLocation/useUserLocation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SearchEventsModal from "../Modals/SearchEventsModal/SearchEventsModal";
import mapStyle from "./mapStyle.json";
interface MapProps extends MapStackScreenProps<"Map"> {}

function Map({ navigation }: MapProps) {
  //States
  const [markerInfo, setMarkerInfo] = useState<IEvent>();
  const { userLocation, city } = useUserLocation();

  // Redux
  const { events, isLoading, error } = useTypedSelector(
    (state) => state.events_state
  );
  const { current_user } = useTypedSelector((state) => state.user_state);
  const { fetch_user, fetch_events } = useActions();

  //References
  const mapRef = useRef<MapView | null>(null);
  const partyMarkerModalRef = useRef<BottomSheet>(null);
  const searchEventsModalRef = useRef<BottomSheet>(null);

  // useEffects
  useEffect(() => {
    fetch_events();
  }, []);

  useEffect(() => {
    fetch_user();
  }, []);

  // functions
  function animateToRegion(region: Region) {
    mapRef.current?.animateToRegion(
      {
        ...region,
        longitudeDelta: 0.001,
        latitudeDelta: 0.001,
      },
      500
    );
  }
  function updateMarkerInfo(newData: Pick<IEvent, "guests">) {
    if (markerInfo) {
      fetch_events();
      setMarkerInfo({ ...markerInfo, ...newData });
    }
  }

  //Render
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* {isLoading && <EventLoader isLoading={true} />} */}
        <MapView
          testID="map"
          provider={PROVIDER_DEFAULT}
          style={StyleSheet.absoluteFill}
          customMapStyle={mapStyle}
          // initialRegion={userLocation}
          paddingAdjustmentBehavior={"automatic"}
          showsUserLocation
          ref={mapRef}
        >
          {events?.map((doc: IEvent, index?: React.Key | null) => {
            return (
              <CustomMarker
                doc={doc}
                index={index}
                onPress={async () => {
                  setMarkerInfo(doc);
                  animateToRegion(doc?.location?.region as Region);
                  partyMarkerModalRef.current?.snapToIndex(0);
                }}
                key={index}
                tracksViewChanges={false}
              />
            );
          })}
        </MapView>
        <ProfileButton
          onPressUser={() => fetch_user()}
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
          onPressSearchPartyButton={() => {
            searchEventsModalRef.current?.snapToIndex(0);
            // setVisibleModal({ ...visibleModal, searchModal: true });
          }}
          onPressSelectedButton={() => {
            navigation.navigate("JoinedEvents", { city: city });
            // joinedEventsModalRef.current?.snapToIndex(0);
          }}
        />
        {/*<SearchModal visible={true} hideModal={() => {}} />*/}
        <SearchEventsModal
          modalRef={searchEventsModalRef}
          city={city!}
          animateToRegion={animateToRegion}
          events={events}
        />
        <PartyModal
          updateMarkerInfo={updateMarkerInfo}
          modalRef={partyMarkerModalRef}
          markerInfo={markerInfo!}
          onClose={() => {
            partyMarkerModalRef.current?.close();
          }}
        />
      </View>
    </GestureHandlerRootView>
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
    paddingTop: 30,
  },
  loaderStyle: { height: 100, zIndex: -1 },
});

// const mapStateToProps = (store: RootState) => ({
//   current_user: store.user_state.current_user,
//   isPartiesLoading: store.parties_state.isLoading,
//   events: store.parties_state.events,
// });
export default Map;
