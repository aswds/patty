import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { onSnapshot } from "firebase/firestore";
import { getDistance } from "geolib";
import _ from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, {
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  eventReference,
  eventsReference,
  userReference,
} from "../../Firebase/References";
import { AppNavigatorNavigationProp } from "../../Types/AppNavigator/AppNavigator";
import type { IEvent } from "../../Types/Events";
import { MapStackScreenProps } from "../../Types/MapStack/ScreenNavigationProps";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { fetchCityParties } from "../../hooks/useUserLocation/useUserLocation";
import { useUserLocationWatch } from "../../hooks/useUserLocationWatch";
import { fetch_joined_event } from "../../redux/actions/Events";
import CustomAlert from "../../shared/Alert/CustomAlert";
import { NoEventFoundAlert } from "../../shared/Alert/NoEventFound";
import LocationLoader from "../../shared/Loaders/LocationLoader";
import { isAndroid } from "../../src/platform";
import PartyModal from "../Modals/PartyModal/PartyModal";
import { deleteParty } from "../Modals/PartyModal/components/actionButtonsFunctions";
import SearchEventsModal from "../Modals/SearchEventsModal/SearchEventsModal";
import {
  fetchViaInviteParties,
  leaveDeletedEvent,
  leaveEvent,
} from "./Firebase/eventFunctions";
import Buttons from "./components/Buttons/Buttons";
import EventMarkers from "./components/EventMarkers";
import MapHeader from "./components/ProfileButton";
import PartyRadiusAlertModal from "./components/RadiusAlert";
import { handleAlertError } from "./helpers/handleAlertError";
import { AlertConfig, pickAlertText } from "./helpers/pickAnAlertType";
import mapStyle from "./mapStyle.json";
import { Alert } from "react-native";
import useLocationPermission from "../../hooks/useLocationPermission";
import { getCurrentPositionAsync } from "expo-location";
import useEventSubscription from "../../hooks/useEventSubscription";
import useFetchUserData from "../../hooks/useFetchUserData";
import { getAddress } from "../../shared/GetLocationFunctions/getAddress";

function Map({ navigation }: MapStackScreenProps<"Map">) {
  //States
  const [markerInfo, setMarkerInfo] = useState<IEvent>();
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [joinedEvent, setJoinedEvent] = useState<IEvent>();
  const location = useTypedSelector(
    (state) => state.user_state.current_user.userLocation
  );

  const city = location?.city;
  const isLocationLoading = location?.isLocationLoading;

  const [events, setEvents] = useState<IEvent[]>([]);
  const [inviteOnlyEvents, setInviteOnlyEvents] = useState<IEvent[]>([]);
  const [showPartyRadiusAlert, setShowPartyRadiusAlert] =
    useState<boolean>(false);
  const [alertError, setAlertError] = useState<AlertConfig>({
    message: "",
    title: "",
  });
  const insets = useSafeAreaInsets();
  const appNavigation = useNavigation<AppNavigatorNavigationProp>();
  // Redux
  const { current_user } = useTypedSelector((state) => state.user_state);
  const { uid, events: userEvents } = current_user;
  const partyLocation = location?.partyLocation;

  const { fetch_user } = useActions();
  //References
  const mapRef = useRef<MapView | null>(null);
  const partyMarkerModalRef = useRef<BottomSheet>(null);
  const searchEventsModalRef = useRef<BottomSheet>(null);
  // useEffects
  //@ts-ignore
  useFetchUserData(fetch_user, []);
  useFetchUserData(async () => {
    await Promise.all([
      fetch_user(),
      fetch_public_events(),
      fetch_viaInvite_events(),
    ]);
  }, []);

  useEventSubscription(() => onSnapshot(userReference(uid), fetch_user), [uid]);

  useEventSubscription(
    () =>
      onSnapshot(eventsReference(partyLocation, "Public"), fetch_public_events),
    [partyLocation]
  );

  useEventSubscription(
    () =>
      onSnapshot(
        eventsReference(partyLocation, "Via Invite"),
        fetch_viaInvite_events
      ),
    [partyLocation]
  );

  useEventSubscription(() => {
    if (partyLocation && userEvents?.eventType && userEvents?.onEvent) {
      return onSnapshot(
        eventReference(
          partyLocation,
          userEvents?.eventType,
          userEvents?.onEvent
        ),
        (snapshot) => {
          if (!snapshot.exists() && uid) {
            leaveDeletedEvent();
            setJoinedEvent(undefined);
          }
        }
      );
    } else {
      return () => {};
    }
  }, [partyLocation, userEvents?.eventType, userEvents?.onEvent, uid]);

  useFetchUserData(
    () =>
      fetchJoinedEvents().then((event) => {
        setJoinedEvent(event);
      }),
    [userEvents?.onEvent, partyLocation, userEvents?.eventType]
  );
  useEffect(() => {
    // animate to user location

    if (location?.coords) animateToRegion(location?.coords);
  }, [location?.coords]);

  // // functions

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

  async function navigateToPartyScreen(partyData: IEvent) {
    const { location } = partyData;
    const currentUserLocation = await getCurrentPositionAsync();

    let dis = getDistance(
      //@ts-ignore
      {
        latitude: currentUserLocation?.coords.latitude,
        longitude: currentUserLocation?.coords.longitude,
      },
      {
        latitude: location.region?.latitude,
        longitude: location.region?.longitude,
      }
    );
    if (
      (dis < partyData?.radiusToPost && partyData?.radiusToPost) ||
      partyData.user.uid === current_user.uid
    ) {
      appNavigation.navigate("PartyNav", {
        screen: "PartyScreen",
        params: {
          partyData: partyData,
        },
      });
    } else {
      setShowPartyRadiusAlert(true);
    }
  }
  function navigateToPartyCreation() {
    navigation.navigate("PartyCreationStack", {
      screen: "GeneralInformation",
    });
  }

  const fetch_viaInvite_events = useCallback(async () => {
    if (partyLocation && current_user.uid)
      fetchViaInviteParties(partyLocation)
        .then((res) => {
          setInviteOnlyEvents(res);
        })
        .catch((e) => {
          setInviteOnlyEvents([]);
        });
  }, [partyLocation, current_user.uid]);

  const fetch_public_events = useCallback(async () => {
    if (partyLocation && current_user.uid) {
      fetchCityParties(partyLocation)
        .then((events) => {
          setEvents(events);
        })
        .catch((e) => {
          setEvents([]);
        });
    }
  }, [partyLocation, current_user.uid]);

  async function fetchJoinedEvents() {
    if (
      current_user.events?.partyLocation &&
      current_user.events?.eventType &&
      current_user.events?.onEvent &&
      current_user.uid
    ) {
      const newEvent = await fetch_joined_event(
        current_user.events?.partyLocation,
        current_user.events.eventType,
        current_user.events.onEvent
      );

      return newEvent;
    } else {
      // Alert.alert("Something went wrong");
    }
  }

  //functions to pass down to children

  function snapTo(index: number) {
    searchEventsModalRef.current?.snapToIndex(index);
  }

  function hideModal() {
    setShowAlertModal(false);
  }

  async function leaveCurrentEvent() {
    if (joinedEvent) {
      await leaveEvent(joinedEvent).then(() => {
        setJoinedEvent(undefined);
        partyMarkerModalRef.current?.close();
      });
    }
  }

  async function onDeleteCurrentEvent() {
    if (joinedEvent) {
      // leaveCurrentEvent();
      await deleteParty(
        joinedEvent.partyID,
        joinedEvent.location.fullAddressInfo?.partyLocation!,
        joinedEvent.party_access
      ).then(() => {
        partyMarkerModalRef.current?.close();
      });
    }
  }

  function handleAlert(
    config: AlertConfig,
    onCancelCallback?: () => void,
    onOkCallback?: () => void
  ) {
    handleAlertError(
      setAlertError,
      setShowAlertModal,
      config,
      onCancelCallback,
      onOkCallback
    );
  }
  function handlePartyPointPress(doc, region) {
    setMarkerInfo(doc);
    animateToRegion(region);
    partyMarkerModalRef.current?.snapToIndex(0);
  }

  // BUTTONS FUNCTIONS

  const handleLeaveEventButtonPress = () => {
    if (joinedEvent && joinedEvent.user.uid === current_user.uid) {
      handleAlert(pickAlertText("hostLeaving"), onDeleteCurrentEvent);
    } else {
      handleAlert(pickAlertText("leaveParty"), leaveCurrentEvent);
    }
  };

  const handlePartyCreationButtonPress = () => {
    if (_.isEmpty(current_user.events.onEvent)) {
      navigateToPartyCreation();
    } else {
      if (joinedEvent && joinedEvent.user.uid === current_user.uid) {
        handleAlert(pickAlertText("hostLeaving"), onDeleteCurrentEvent);
      } else {
        handleAlert(pickAlertText("toCreate"), leaveCurrentEvent);
      }
    }
  };

  const handleSearchPartyButtonPress = () => {
    searchEventsModalRef.current?.snapToIndex(0);
    // setVisibleModal({ ...visibleModal, searchModal: true });
  };

  const handleSelectedButtonPress = async () => {
    try {
      if (joinedEvent) {
        navigateToPartyScreen(joinedEvent);
      } else {
        const event = await fetchJoinedEvents();
        setJoinedEvent(event);
        if (event) {
          navigateToPartyScreen(event);
        } else if (!current_user.events.onEvent) {
          handleAlert(pickAlertText("noPartyJoined"));
        }
      }
    } catch (e) {
      if (typeof e === "string") {
        setAlertError({
          title: "Something went wrong...",
          message: e.message,
        });
      } else if (e instanceof Error) {
        setAlertError({
          title: "Something went wrong...",
          message: e.message,
        });
      }
    }
  };

  //Render
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {isLocationLoading && <LocationLoader isLoading={isLocationLoading} />}
        {!isLocationLoading &&
          _.isEmpty(events) &&
          _.isEmpty(inviteOnlyEvents) && (
            <NoEventFoundAlert
              isVisible={_.isEmpty(events) && _.isEmpty(inviteOnlyEvents)}
            />
          )}
        <MapView
          testID="map"
          provider={isAndroid ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
          style={StyleSheet.absoluteFill}
          customMapStyle={mapStyle}
          showsUserLocation
          showsCompass={false}
          showsMyLocationButton={false}
          ref={mapRef}
        >
          <EventMarkers events={events} onMarkerPress={handlePartyPointPress} />
          <EventMarkers
            events={inviteOnlyEvents}
            onMarkerPress={handlePartyPointPress}
          />
        </MapView>
        <MapHeader
          userUID={current_user.uid!}
          userImage={current_user.image}
          onLongPress={() => animateToRegion(location?.coords as Region)}
          containerStyle={{
            top: "1%",
            marginTop: insets.top,
          }}
          city={city}
        />

        <Buttons
          onPressLeaveEventButton={handleLeaveEventButtonPress}
          onPressPartyCreationButton={handlePartyCreationButtonPress}
          onPressSearchPartyButton={handleSearchPartyButtonPress}
          onPressSelectedButton={handleSelectedButtonPress}
        />
        {/*<SearchModal visible={true} hideModal={() => {}} />*/}
        <SearchEventsModal
          modalRef={searchEventsModalRef}
          city={partyLocation!}
          snapTo={snapTo}
          animateToRegion={animateToRegion}
          events={[...events, ...inviteOnlyEvents]}
        />
        <PartyModal
          modalRef={partyMarkerModalRef}
          markerInfo={markerInfo!}
          onClose={() => {
            partyMarkerModalRef.current?.close();
          }}
          onDeleteCurrentEvent={onDeleteCurrentEvent}
          onLeaveCurrentEvent={leaveCurrentEvent}
          navigateToPartyScreen={navigateToPartyScreen}
          handleAlertError={handleAlertError.bind(
            null,
            setAlertError,
            setShowAlertModal
          )}
          onJoin={(event: IEvent) => {
            setJoinedEvent(event);
          }}
        />
        <CustomAlert
          showModal={showAlertModal}
          hideModal={hideModal}
          title={alertError.title}
          errorMsg={alertError.message}
          okButtonText={alertError.okText}
          cancelButtonText={alertError.cancelText}
          onPressCancel={() => {
            if (alertError.onCancelCallback) {
              alertError.onCancelCallback();
              partyMarkerModalRef.current?.close();
              setShowAlertModal(false);
              return;
            }
            if (joinedEvent) {
              leaveCurrentEvent();
              setShowAlertModal(false);
            } else {
              if (alertError.type === "toCreate") navigateToPartyCreation();
              partyMarkerModalRef.current?.close();
              setShowAlertModal(false);
            }
          }}
        />
        <PartyRadiusAlertModal
          isVisible={showPartyRadiusAlert}
          onClose={() => setShowPartyRadiusAlert(false)}
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

export default Map;
