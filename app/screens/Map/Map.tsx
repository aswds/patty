import BottomSheet from "@gorhom/bottom-sheet";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { onSnapshot } from "firebase/firestore";
import _ from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { PROVIDER_DEFAULT, Region } from "react-native-maps";
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
import {
  fetchCityParties,
  useUserLocation,
} from "../../hooks/useUserLocation/useUserLocation";
import { fetch_joined_event } from "../../redux/actions/Events";
import { clearCreateEvents } from "../../redux/reducers/CreateEvent";
import CustomAlert from "../../shared/Alert/CustomAlert";
import LocationLoader from "../../shared/Loaders/LocationLoader";
import PartyModal from "../Modals/PartyModal/PartyModal";
import SearchEventsModal from "../Modals/SearchEventsModal/SearchEventsModal";
import {
  fetchViaInviteParties,
  leaveDeletedEvent,
  leaveEvent,
} from "./Firebase/leaveEvents";
import Buttons from "./components/Buttons/Buttons";
import ProfileButton from "./components/ProfileButton";
import { AlertConfig, pickAlertText } from "./helpers/pickAnAlertType";
import mapStyle from "./mapStyle.json";

import { NoEventFoundAlert } from "../../shared/Alert/NoEventFound";
import { deleteParty } from "../Modals/PartyModal/components/actionButtonsFunctions";
import EventMarkers from "./components/EventMarkers";
import { handleAlertError } from "./helpers/handleAlertError";

function Map({ navigation }: MapStackScreenProps<"Map">) {
  //States
  const [markerInfo, setMarkerInfo] = useState<IEvent>();
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [joinedEvent, setJoinedEvent] = useState<IEvent>();
  const [location, isLocationLoading] = useUserLocation();
  const city = location.city;
  const [showLoader, setShowLoader] = useState<boolean>(isLocationLoading);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [inviteOnlyEvents, setInviteOnlyEvents] = useState<IEvent[]>([]);

  const [alertError, setAlertError] = useState<AlertConfig>({
    message: "",
    title: "",
  });
  const insets = useSafeAreaInsets();
  const appNavigation = useNavigation<AppNavigatorNavigationProp>();
  // Redux
  const { current_user } = useTypedSelector((state) => state.user_state);

  const { fetch_user } = useActions();
  //References
  const mapRef = useRef<MapView | null>(null);
  const partyMarkerModalRef = useRef<BottomSheet>(null);
  const searchEventsModalRef = useRef<BottomSheet>(null);
  // useEffects

  // clearing onEvent when party has been deleted

  useEffect(() => {
    fetch_user();
    fetch_public_events();
    fetch_viaInvite_events();
  }, []);

  useEffect(() => {
    if (current_user.uid) {
      const userRef = userReference(current_user.uid);
      const unsub = onSnapshot(userRef, () => {
        fetch_user();
      });
      return () => unsub();
    }
  }, [current_user?.uid]);

  useEffect(() => {
    if (city) {
      const public_eventsRef = eventsReference(city, "Public");
      const viaInvite_eventsRef = eventsReference(city, "Via Invite");
      const unsubscribe_public_events = onSnapshot(public_eventsRef, () => {
        fetch_public_events();
      });

      const unsubscribe_viaInvite_events = onSnapshot(
        viaInvite_eventsRef,
        () => {
          fetch_viaInvite_events();
        }
      );

      return () => {
        unsubscribe_public_events();
        unsubscribe_viaInvite_events();
      };
    }
  }, [city, current_user.events?.onEvent, current_user.events?.eventType]);

  useEffect(() => {
    if (
      city &&
      current_user.events?.eventType &&
      current_user.events?.onEvent
    ) {
      const eventRef = eventReference(
        city,
        current_user.events?.eventType,
        current_user.events?.onEvent
      );

      const unsubscribe = onSnapshot(eventRef, (snapshot) => {
        if (!snapshot.exists()) {
          leaveDeletedEvent();
          setJoinedEvent(undefined);
          fetch_viaInvite_events();
          fetch_public_events();
        }
      });

      return () => unsubscribe();
    }
  }, [current_user.events?.eventType, current_user.events?.onEvent, city]);

  useEffect(() => {
    if (city && current_user.events?.eventType && current_user.events.onEvent) {
      fetchJoinedEvents().then((event) => setJoinedEvent(event));
    }
  }, [current_user.events?.onEvent, city, current_user.events?.eventType]);

  useEffect(() => {
    // animate to user location

    if (current_user.userLocation?.location)
      animateToRegion(current_user.userLocation?.location);
  }, [current_user.userLocation?.location]);

  useFocusEffect(() => {
    //clearing create party info
    clearCreateEvents();
  });

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

  function navigateToPartyScreen(partyData: IEvent) {
    appNavigation.navigate("PartyNav", {
      screen: "PartyScreen",
      params: {
        partyData: partyData,
      },
    });
  }
  function navigateToPartyCreation() {
    navigation.navigate("PartyCreationStack", {
      screen: "GeneralInformation",
    });
  }

  const fetch_viaInvite_events = useCallback(async () => {
    if (city)
      fetchViaInviteParties(city)
        .then((res) => {
          setInviteOnlyEvents(res);
        })
        .catch(() => {
          setInviteOnlyEvents([]);
        });
  }, [city]);

  const fetch_public_events = useCallback(async () => {
    if (city) {
      fetchCityParties(city)
        .then((events) => {
          setEvents(events);
        })
        .catch(() => {
          setEvents([]);
        });
    }
  }, [city]);

  async function fetchJoinedEvents() {
    if (
      city &&
      current_user.events?.eventType &&
      current_user.events?.onEvent
    ) {
      const newEvent = await fetch_joined_event(
        city,
        current_user.events.eventType,
        current_user.events.onEvent
      );
      return newEvent;
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
      leaveCurrentEvent();
      await deleteParty(
        joinedEvent.partyID,
        joinedEvent.location.fullAddressInfo?.subregion!,
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

  //Render
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {isLocationLoading && <LocationLoader isLoading={true} />}
        {!isLocationLoading &&
          _.isEmpty(events) &&
          _.isEmpty(inviteOnlyEvents) && (
            <NoEventFoundAlert
              isVisible={_.isEmpty(events) && _.isEmpty(inviteOnlyEvents)}
            />
          )}
        <MapView
          testID="map"
          provider={PROVIDER_DEFAULT}
          style={StyleSheet.absoluteFill}
          customMapStyle={mapStyle}
          paddingAdjustmentBehavior={"automatic"}
          showsUserLocation
          showsCompass={false}
          showsMyLocationButton={false}
          ref={mapRef}
        >
          {/* onPress={async () => {
                  setMarkerInfo(doc);
                  animateToRegion(doc?.location?.region as Region);
                  partyMarkerModalRef.current?.snapToIndex(0);
                }} */}
          <EventMarkers
            events={events}
            onMarkerPress={async (doc) => {
              setMarkerInfo(doc);
              animateToRegion(doc?.location?.region as Region);
              partyMarkerModalRef.current?.snapToIndex(0);
            }}
          />
          <EventMarkers
            events={inviteOnlyEvents}
            onMarkerPress={async (doc) => {
              setMarkerInfo(doc);
              animateToRegion(doc?.location?.region as Region);
              partyMarkerModalRef.current?.snapToIndex(0);
            }}
          />
        </MapView>
        <ProfileButton
          userUID={current_user.uid!}
          userImage={current_user.image}
          onLongPress={() => animateToRegion(location.coords as Region)}
          containerStyle={{ right: "5%", top: "1%", marginTop: insets.top }}
        />

        <Buttons
          onPressPartyCreationButton={() => {
            if (_.isEmpty(current_user.events.onEvent)) {
              navigateToPartyCreation();
            } else {
              if (joinedEvent && joinedEvent.user.uid === current_user.uid) {
                handleAlert(pickAlertText("hostLeaving"), onDeleteCurrentEvent);
              } else {
                handleAlert(pickAlertText("toCreate"), leaveCurrentEvent);
              }
            }
          }}
          onPressSearchPartyButton={() => {
            searchEventsModalRef.current?.snapToIndex(0);
            // setVisibleModal({ ...visibleModal, searchModal: true });
          }}
          onPressSelectedButton={async () => {
            try {
              if (joinedEvent) {
                navigateToPartyScreen(joinedEvent);
              } else {
                await fetchJoinedEvents().then((event) => {
                  setJoinedEvent(event);
                  if (event) {
                    navigateToPartyScreen(event);
                  }
                });
              }

              setAlertError(pickAlertText("noPartyJoined"));
            } catch (e) {
              //@ts-expect-error
              const result = e.message; // error under useUnknownInCatchVariables

              if (typeof e === "string") {
                e.toUpperCase(); // works, `e` narrowed to string
              } else if (e instanceof Error) {
                // works, `e` narrowed to Error
                setAlertError({
                  title: "Something went wrong...",
                  message: e.message,
                });
              }
            } finally {
              setShowLoader(false);
            }
          }}
        />
        {/*<SearchModal visible={true} hideModal={() => {}} />*/}
        <SearchEventsModal
          modalRef={searchEventsModalRef}
          city={city!}
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
