import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { ModalProps } from "./Types/Modals";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../src/colors";
import { IEvent } from "../../Types/Events";
import { Region } from "react-native-maps";
import RenderItem from "../Map/JoinedEvents/RenderItem";
interface BottomSheetModalProps extends ModalProps {
  joinedEvents: IEvent[];
  animateToRegion: (region: Region) => void;
}

const BottomSheetModalJoinedEvents: React.FC<BottomSheetModalProps> = ({
  modalRef,
  onClose,
  joinedEvents,
  animateToRegion,
}) => {
  // variables
  const snapPoints = useMemo(() => ["30%", "60%"], []);
  const insets = useSafeAreaInsets();
  // render

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

export default BottomSheetModalJoinedEvents;
