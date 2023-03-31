import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Region } from "react-native-maps";
import { ModalProps } from "../Types/Modals";
import { colors } from "../../../src/colors";
import { IEvent } from "../../../Types/Events";
import { fetch_joined_events } from "../../../redux/actions/Events";
import RenderItem from "../../Map/JoinedEvents/RenderItem";
import SearchBar from "../../../shared/Searcher/SearchBar";
import { Feather } from "@expo/vector-icons";
interface JoinedEventsModal extends ModalProps {
  city: string;
  animateToRegion: (region: Region) => void;
  title: JSX.Element;
}

const SearchEventsModal: React.FC<JoinedEventsModal> = ({
  modalRef,
  onClose,
  animateToRegion,
  title,
  city,
}) => {
  //states
  const [joinedEvents, setJoinedEvents] = useState<IEvent[]>();

  //useEffects
  useEffect(() => {}, [onClose]);

  // variables
  const snapPoints = useMemo(() => ["30%", "60%"], []);
  const insets = useSafeAreaInsets();
  function renderItem({ item, index }: { item: IEvent; index: number }) {
    return (
      <RenderItem
        item={item}
        onPress={() => {
          animateToRegion(item.location?.region!);
        }}
        key={index}
      />
    );
  }
  // render
  function ListHeaderComponent() {
    return (
      <View style={{ marginVertical: "2%" }}>
        <SearchBar
          icon={
            <Feather
              name="search"
              size={24}
              color={colors.accentColor}
              style={{ paddingRight: 5 }}
            />
          }
          containerStyle={styles.searchBarContainerStyle}
          style={{
            flex: 1,
            color: colors.text,
          }}
          placeholder={"Search parties by tag or title"}
        />
        {title}
      </View>
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
        ListHeaderComponent={ListHeaderComponent}
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
  searchBarContainerStyle: { width: "100%", justifyContent: "center" },
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

export default SearchEventsModal;
