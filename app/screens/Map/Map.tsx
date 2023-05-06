import BottomSheet from "@gorhom/bottom-sheet";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { onSnapshot } from "firebase/firestore";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
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
import { removeItemOnce } from "../../helpers/removeItemOnce";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import useUserLocation, {
  fetchCityParties,
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
import { AlertConfig, pickAlertErrors } from "./helpers/pickAnAlertType";
import mapStyle from "./mapStyle.json";

import { NoEventFoundAlert } from "../../shared/Alert/NoEventFound";
import EventMarkers from "./components/EventMarkers";
import { handleAlertError } from "./helpers/handleAlertError";
function Map({ navigation }: MapStackScreenProps<"Map">) {
  //States
  const [markerInfo, setMarkerInfo] = useState<IEvent>();
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [joinedEvent, setJoinedEvent] = useState<IEvent>();
  const { userLocation, isLocationLoading } = useUserLocation();
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
  const { isLoading, error } = useTypedSelector((state) => state.events_state);
  const { current_user } = useTypedSelector((state) => state.user_state);
  const city = current_user.userLocation?.city;

  const { fetch_user, updateUser } = useActions();
  //References
  const mapRef = useRef<MapView | null>(null);
  const partyMarkerModalRef = useRef<BottomSheet>(null);
  const searchEventsModalRef = useRef<BottomSheet>(null);
  // useEffects

  // clearing onEvent when party has been deleted

  useEffect(() => {
    // first render
    fetch_user();
    fetch_events();
  }, []);

  useEffect(() => {
    if (current_user.uid) {
      const userRef = userReference(current_user?.uid);
      const unsub = onSnapshot(userRef, () => {
        fetch_user();
      });
      return () => unsub();
    }
  }, []);
  useEffect(() => {
    if (city && !_.isEmpty(current_user.events?.eventType)) {
      const eventRef = eventsReference(city, current_user.events.eventType);
      const unsub = onSnapshot(eventRef, () => {
        fetch_events();
      });

      return () => unsub();
    }
  }, [city]);
  useEffect(() => {
    if (
      city &&
      current_user.events?.onEvent &&
      !_.isEmpty(current_user.events?.eventType)
    ) {
      const eventRef = eventReference(
        city,
        current_user.events.eventType,
        current_user.events?.onEvent
      );
      const unsub = onSnapshot(eventRef, async (snapshot) => {
        if (!snapshot.exists()) {
          leaveDeletedEvent();
          fetch_events();
          fetch_user();
          setJoinedEvent(undefined);
        }
      });
      return () => unsub();
    }
  }, [city]);

  useEffect(() => {
    // animate to user location
    animateToRegion(userLocation!);
  }, [userLocation]);

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
  async function fetch_events() {
    if (userLocation && city) {
      fetchCityParties(city)
        .then((events) => {
          setEvents(events);
        })
        .catch(() => {
          setEvents([]);
        });
      fetchViaInviteParties(city).then((res) => {
        setInviteOnlyEvents(res);
      });
    }
  }
  //functions to pass down to children

  function snapTo(index: number) {
    searchEventsModalRef.current?.snapToIndex(index);
  }

  function hideModal() {
    setShowAlertModal(false);
  }

  async function leaveCurrentEvent(event?: IEvent) {
    if (event) {
      await leaveEvent(event).then(() => {
        setJoinedEvent(undefined);
      });
      updateUser({
        ...current_user,
        events: { ...current_user.events, onEvent: "" },
      });
      partyMarkerModalRef.current?.close();
    }
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
          onMapReady={() => {
            animateToRegion(userLocation!);
          }}
          // initialRegion={userLocation}
          paddingAdjustmentBehavior={"automatic"}
          showsUserLocation
          showsCompass={false}
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
          onLongPress={() =>
            mapRef?.current?.animateToRegion(userLocation as Region)
          }
          containerStyle={{ right: "5%", top: "1%", marginTop: insets.top }}
        />

        <Buttons
          onPressPartyCreationButton={() => {
            if (_.isEmpty(current_user.events.onEvent)) {
              navigateToPartyCreation();
            } else {
              setAlertError(pickAlertErrors("toCreate"));
              setShowAlertModal(true);
            }
          }}
          onPressSearchPartyButton={() => {
            searchEventsModalRef.current?.snapToIndex(0);
            // setVisibleModal({ ...visibleModal, searchModal: true });
          }}
          onPressSelectedButton={async () => {
            setShowLoader(true);

            try {
              if (joinedEvent) {
                navigateToPartyScreen(joinedEvent);
                return;
              }
              if (city && current_user.events.onEvent) {
                const event = await fetch_joined_event(
                  city,
                  current_user.events.eventType,
                  current_user.events.onEvent
                );
                if (event) {
                  setJoinedEvent(event);
                  navigateToPartyScreen(event);
                  return;
                }
              } else {
              }
              setAlertError(pickAlertErrors("noPartyJoined"));
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
          events={events}
        />
        <PartyModal
          modalRef={partyMarkerModalRef}
          markerInfo={markerInfo!}
          onClose={() => {
            partyMarkerModalRef.current?.close();
          }}
          onLeaveCurrentEvent={leaveCurrentEvent}
          handleAlertError={handleAlertError.bind(
            null,
            setAlertError,
            setShowAlertModal
          )}
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
              hideModal();
              return;
            }
            if (joinedEvent) {
              leaveCurrentEvent(joinedEvent);
            } else {
              fetch_joined_event(
                current_user.userLocation?.city,
                current_user.events.onEvent
              ).then((event) => {
                leaveCurrentEvent(event);
              });
            }
            if (alertError.type === "toCreate") navigateToPartyCreation();
            partyMarkerModalRef.current?.close();
            hideModal();
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
