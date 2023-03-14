import React, { Ref, useEffect, useState } from "react";
import RenderItem from "./RenderItem";
import { IEvent } from "../../../../Types/Events";
import { ModalProps } from "../Types/Modals";
import BottomSheet from "@gorhom/bottom-sheet";
import { StyleSheet, View } from "react-native";
import { fetch_joined_events } from "../../../../redux/actions/Events";
import BottomSheetModalJoinedEvents from "../BottomSheetModalJoinedEvents";

interface JoinedEventsModalProps extends ModalProps {
  modalRef: Ref<BottomSheet>;
  title: React.ReactNode;
}

const JoinedEventsModal = ({
  visible,
  onClose,
  modalRef,
  title,
}: JoinedEventsModalProps) => {
  useEffect(() => {
    fetch_joined_events().then((docs) => setSelected(docs));
  }, []);

  const [selected, setSelected] = useState<IEvent[]>([]);

  return (
    <BottomSheetModalJoinedEvents
      modalRef={modalRef}
      onClose={onClose}
      visible={visible}
    >
      <View style={styles.titleContainer}>{title}</View>
      {selected.map((item, index) => (
        <RenderItem item={item} key={index} />
      ))}
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
