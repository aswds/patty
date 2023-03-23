import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Region } from "react-native-maps";
import { ModalProps } from "../Types/Modals";
import { colors } from "../../../src/colors";
import { IEvent } from "../../../Types/Events";
import RenderItem from "./RenderItem";
import { fetch_joined_events } from "../../../redux/actions/Events";

interface JoinedEventsModal extends ModalProps {
  City: string;
  animateToRegion: (region: Region) => void;
  title: JSX.Element;
}

const JoinedEventsModal: React.FC<JoinedEventsModal> = ({
  modalRef,
  onClose,
  animateToRegion,
  title,
  City,
}) => {
  //states
  const [joinedEvents, setJoinedEvents] = useState<IEvent[]>();

  //useEffects

  useEffect(() => {
    fetch_joined_events(City).then(setJoinedEvents);
  }, [onClose]);

  // variables
  const snapPoints = useMemo(() => ["30%", "60%"], []);
  const insets = useSafeAreaInsets();
  function onPress(region: Region) {
    animateToRegion(region);
  }
  function renderItem({ item, index }: { item: IEvent; index: number }) {
    return (
      <RenderItem
        item={item}
        onPress={() => {
          onPress(item.location?.region!);
        }}
        key={index}
      />
    );
  }
  // render

  return (
    <BottomSheet
      style={styles.container}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose
      onClose={onClose}
      ref={modalRef}
      backgroundStyle={styles.backgroundStyle}
      handleIndicatorStyle={{
        backgroundColor: "gray",
      }}
      containerStyle={{
        overflow: "hidden",
      }}
    >
      <BottomSheetFlatList
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: insets.bottom },
        ]}
        ListHeaderComponent={title}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(event) => event.partyID!}
        data={joinedEvents}
        renderItem={renderItem}
      />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  backgroundStyle: {
    backgroundColor: colors.modalBackground,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
});

export default JoinedEventsModal;
