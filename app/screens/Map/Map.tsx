import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import PartyMarkerInfo from "../Modals/PartyModal/PartyMarkerInfo";
import type { ICoordinates, IEvent } from "../../Types/Events";
import { MapScreenNavigationProps } from "../../Types/MapStack/ScreenNavigationProps";
import Buttons from "./components/Buttons/Buttons";
import ProfileButton from "./components/ProfileButton";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import EventLoader from "../../shared/Loaders/EventsLoader";
import CustomMarker from "./components/Markers/CustomMarker";
import { useFocusEffect } from "@react-navigation/native";
import { getUserLocation } from "../../shared/GetLocationFunctions/getUserLocation";
import { LocationObject } from "expo-location";
import BottomSheet from "@gorhom/bottom-sheet";
import JoinedEventsModal from "../Modals/JoinedEventsModal/JoinedEventsModal";
import { Title } from "../../shared/Title/Title";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../src/colors";

const mapStyle = require("./mapStyle.json");
interface MapProps extends MapScreenNavigationProps {}

function Map({ navigation }: MapProps) {
  //States
  const [userLocation, setUserLocation] = useState<ICoordinates>();
  const [markerInfo, setMarkerInfo] = useState<IEvent>();

  // Redux
  const { current_user } = useTypedSelector((state) => state.user_state);
  const { events, isLoading, error } = useTypedSelector(
    (state) => state.events_state
  );
  const { fetch_user, fetch_events } = useActions();

  //References
  const mapRef = useRef<MapView | null>(null);
  const partyMarkerModalRef = useRef<BottomSheet>(null);
  const joinedEventsModalRef = useRef<BottomSheet>(null);
  //Icons
  const selectedIcon = (
    <AntDesign name="star" size={35} color={colors.accentColor} />
  );

  // useEffects
  useEffect(() => {
    getUserLocation()
      .then((userLocation: LocationObject) => {
        setUserLocation({
          latitude: userLocation.coords.latitude,
          latitudeDelta: 0,
          longitude: userLocation.coords.longitude,
          longitudeDelta: -0.01,
        });
      })
      .catch(() => Alert.alert("Error occurred", "Can't get your location"));
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetch_events();
    }, [])
  );
  useEffect(() => {
    fetch_user();
  }, []);

  // functions
  function animateToRegion(region: Region) {
    mapRef.current?.animateToRegion(region);
  }

  //Render
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        {isLoading && <EventLoader isLoading={true} />}
        <MapView
          style={styles.container}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          initialRegion={userLocation as Region}
          userLocationPriority={"low"}
          showsBuildings
          loadingEnabled
          paddingAdjustmentBehavior={"automatic"}
          showsUserLocation
          mapPadding={{ top: 0, right: 0, left: 0, bottom: 10 }}
          ref={mapRef}
        >
          {events?.map((doc: IEvent, index?: React.Key | null) => {
            return (
              <CustomMarker
                doc={doc}
                index={index}
                onPress={() => {
                  joinedEventsModalRef.current?.close();
                  partyMarkerModalRef.current?.snapToIndex(0);
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
          onPressSearchPartyButton={() => {
            // setVisibleModal({ ...visibleModal, searchModal: true });
          }}
          onPressSelectedButton={() => {
            joinedEventsModalRef.current?.snapToIndex(0);
          }}
        />
        <JoinedEventsModal
          animateToRegion={animateToRegion}
          modalRef={joinedEventsModalRef}
          onClose={() => {
            joinedEventsModalRef.current?.close();
          }}
          title={
            <Title
              title={"Selected"}
              modalIcon={selectedIcon}
              description={"Added events"}
            />
          }
        />

        {/*<SearchModal visible={true} hideModal={() => {}} />*/}
        <PartyMarkerInfo
          modalRef={partyMarkerModalRef}
          markerInfo={markerInfo!}
          onClose={() => {
            partyMarkerModalRef.current?.close();
          }}
        />
      </View>
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

// const mapStateToProps = (store: RootState) => ({
//   current_user: store.user_state.current_user,
//   isPartiesLoading: store.parties_state.isLoading,
//   events: store.parties_state.events,
// });
export default Map;
