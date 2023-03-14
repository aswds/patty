import React, { Ref } from "react";

import { StyleSheet, Text, View } from "react-native";
import TagItem from "../../../../shared/Tag/TagItem";
import { ActionButtons } from "./components/ActionButtons";
import { Event } from "../../../../shared/Title/Event";
import { JoinEventButton } from "./components/JoinPartyButton";
import { IEvent } from "../../../../Types/Events";
import BottomSheet from "@gorhom/bottom-sheet";
import { ModalProps } from "../Types/Modals";
import { colors } from "../../../../src/colors";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import BottomSheetModal from "../BottomSheetModal";

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
};

const PartyMarkerInfo = ({
  markerInfo,
  onClose,
  modalRef,
}: PartyMarkerModalProps) => {
  return (
    <BottomSheetModal modalRef={modalRef} onClose={onClose}>
      <Event markerInfo={markerInfo} />
      <Description markerInfo={markerInfo} />
      <TagList markerInfo={markerInfo} />
      <ActionButtons />
      <JoinEventButton data={markerInfo} />
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
