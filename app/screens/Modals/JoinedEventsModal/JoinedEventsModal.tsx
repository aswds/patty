import React, { useEffect, useState } from "react";
import { IEvent } from "../../../Types/Events";
import { ModalProps } from "../Types/Modals";
import { StyleSheet, View } from "react-native";
import { fetch_joined_events } from "../../../redux/actions/Events";
import BottomSheetModalJoinedEvents from "../BottomSheetModalJoinedEvents";
import JoinedEventsList from "./JoinedEventsList";
import { Region } from "react-native-maps";

interface JoinedEventsModalProps extends ModalProps {
  title: React.ReactNode;
  animateToRegion: (region: Region) => void;
}

const JoinedEventsModal = ({
  visible,
  onClose,
  modalRef,
  title,
  animateToRegion,
}: JoinedEventsModalProps) => {
  useEffect(() => {
    fetch_joined_events().then((docs) => setJoinedEvents(docs));
  }, []);

  const [joinedEvents, setJoinedEvents] = useState<IEvent[]>([]);

  return (
    <BottomSheetModalJoinedEvents
      modalRef={modalRef}
      onClose={onClose}
      visible={visible}
    >
      <View style={styles.titleContainer}>{title}</View>

      <JoinedEventsList
        joinedEvents={joinedEvents}
        animateToRegion={animateToRegion}
      />
    </BottomSheetModalJoinedEvents>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    zIndex: 1,
  },

  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default JoinedEventsModal;
