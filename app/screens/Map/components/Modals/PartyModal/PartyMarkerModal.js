import React from "react";

import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../../../src/colors";
import TagItem from "../../../../../shared/Tag/TagItem";
import { ActionButtons } from "./components/ActionButtons";
import { Event } from "../../../../../shared/Title/TopInfo_modal";
import { FontFamily } from "../../../../../../assets/fonts/Fonts";
import ModalLayout from "../ModalLayout";
import { JoinEventButton } from "./components/JoinPartyButton";

const borderRadius = 35;

function Description({ markerInfo }) {
  return (
    <View style={styles.descriptionContainer}>
      <Text style={styles.descriptionTextStyle}>{markerInfo?.description}</Text>
    </View>
  );
}
function TagList({ markerInfo }) {
  return (
    <View style={styles.tagsContainer}>
      {markerInfo?.tags.map((tag, index) => (
        <TagItem tag={tag} id={index} onDelete={() => {}} key={index} />
      ))}
    </View>
  );
}

const PartyMarkerModal = (props) => {
  const { markerInfo, hideModal, visible } = props;
  return (
    <ModalLayout
      visible={visible}
      hideModal={hideModal}
      // title={<Title title={markerInfo.title} />}
    >
      <Event markerInfo={markerInfo} hideModal={hideModal} />
      <Description markerInfo={markerInfo} />
      <TagList markerInfo={markerInfo} />
      <ActionButtons />
      <JoinEventButton />
    </ModalLayout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },

  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  iOSBackdrop: {
    backgroundColor: "#000000",
    opacity: 0.3,
  },
  androidBackdrop: {
    backgroundColor: "#232f34",
    opacity: 0.32,
  },
  bottomSheetContainer: {
    backgroundColor: "#1E1E1E",
    borderTopRightRadius: borderRadius,
    borderTopLeftRadius: borderRadius,
    padding: 20,
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
export default PartyMarkerModal;
