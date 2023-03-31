import React, {
  ForwardedRef,
  MutableRefObject,
  RefObject,
  useEffect,
  useState,
} from "react";

import { SafeAreaView, StyleSheet, Text, View } from "react-native";
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
import { removeItemOnce } from "../../../helpers/removeItemOnce";

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
  modalRef: RefObject<BottomSheet>;
  updateMarkerInfo: (newData: Pick<IEvent, "guests">) => void;
};

const PartyModal: React.FC<PartyMarkerModalProps> = ({
  markerInfo,
  onClose,
  modalRef,
  updateMarkerInfo,
}) => {
  const { uid } = useTypedSelector((state) => state.user_state.current_user);
  const [isJoinedEvent, setIsJoinedEvent] = useState<boolean>(
    markerInfo?.guests.includes(uid!)
  );
  const [isCreator, _] = useState<boolean>(markerInfo?.user?.uid == uid);
  useEffect(() => {
    setIsJoinedEvent(markerInfo?.guests.includes(uid!));
  }, [onClose]);

  function onPress(data: IEvent) {
    if (isJoinedEvent) {
      updateMarkerInfo({
        guests: removeItemOnce([...markerInfo.guests], uid!),
      });
      leaveEvent(data).then(() => onClose!());
    } else {
      updateMarkerInfo({ guests: [...markerInfo.guests, uid!] });
      joinEvent(data).then((r) => onClose!());
    }
  }

  function closeModal() {
    modalRef.current?.close;
  }

  return (
    <BottomSheetModal modalRef={modalRef} onClose={onClose}>
      <Event markerInfo={markerInfo} />
      <Description markerInfo={markerInfo} />
      <TagList markerInfo={markerInfo} />
      <ActionButtons
        userUID={markerInfo?.user.uid!}
        partyID={markerInfo?.partyID}
        city={markerInfo?.location?.fullAddressInfo?.city}
        closeModal={closeModal}
      />
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
    margin: -5,
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
export default PartyModal;
