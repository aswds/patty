import React, { Ref, useEffect, useState } from "react";

import { StyleSheet, Text, View } from "react-native";
import TagItem from "../../../shared/Tag/TagItem";
import { ActionButtons } from "./components/ActionButtons";
import { Event } from "../../../shared/Title/Event";
import { JoinEventButton } from "./components/JoinPartyButton";
import { IEvent } from "../../../Types/Events";
import BottomSheet from "@gorhom/bottom-sheet";
import { ModalProps } from "../Types/Modals";
import { colors } from "../../../src/colors";
import { FontFamily } from "../../../../assets/fonts/Fonts";
import BottomSheetModal from "../BottomSheetModal";
import {
  joinEvent,
  leaveEvent,
} from "../../Map/Firebase/fetchUserJoinedEvents";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

function Description({ markerInfo }: { markerInfo: IEvent }) {
  return (
    <View style={styles.descriptionContainer}>
      <Text style={styles.descriptionTextStyle}>{markerInfo?.description}</Text>
    </View>
  );
}
function TagList({ markerInfo }: { markerInfo: IEvent }) {
  return (
    <View style={styles.tagsContainer}>
      {markerInfo?.tags?.map((tag, index) => (
        <TagItem tag={tag} id={index} onDelete={() => {}} key={index} />
      ))}
    </View>
  );
}

type PartyMarkerModalProps = ModalProps & {
  markerInfo: IEvent;
  modalRef: Ref<BottomSheet>;
  updateMarkerInfo: (newData: Pick<IEvent, "guests">) => void;
};

const PartyMarkerInfo = ({
  markerInfo,
  onClose,
  modalRef,
  updateMarkerInfo,
}: PartyMarkerModalProps) => {
  const { uid } = useTypedSelector((state) => state.user_state.current_user);
  const [isJoinedEvent, setIsJoinedEvent] = useState<boolean>(
    markerInfo?.guests.includes(uid!)
  );
  const [isCreator, setIsCreator] = useState<boolean>(
    markerInfo?.user?.uid == uid
  );
  useEffect(() => {
    setIsJoinedEvent(markerInfo?.guests.includes(uid!));
  }, [onClose]);

  function onPress(data: IEvent) {
    if (isJoinedEvent) {
      const guestsArrayCopy = [...markerInfo.guests];
      const indexToDelete = markerInfo.guests.indexOf(uid!);
      updateMarkerInfo({
        ...markerInfo,
        guests: [...guestsArrayCopy.splice(indexToDelete, 0)],
      });
      leaveEvent(data).then(() => onClose!());
    } else {
      updateMarkerInfo({ guests: [...markerInfo.guests, uid!] });
      joinEvent(data).then((r) => onClose!());
    }
  }
  return (
    <BottomSheetModal modalRef={modalRef} onClose={onClose}>
      <Event markerInfo={markerInfo} />
      <Description markerInfo={markerInfo} />
      <TagList markerInfo={markerInfo} />
      <ActionButtons userUID={markerInfo?.user.uid!} />
      <JoinEventButton
        data={markerInfo}
        onPress={onPress}
        isJoinedEvent={isJoinedEvent}
        isCreator={isCreator}
      />
    </BottomSheetModal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  descriptionTextStyle: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: colors.iconColor,
  },

  descriptionContainer: {
    marginBottom: "5%",
    width: "100%",
  },
});
export default PartyMarkerInfo;
