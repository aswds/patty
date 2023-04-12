import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Region } from "react-native-maps";
import { ModalProps } from "../Types/Modals";
import { colors } from "../../../src/colors";
import { IEvent } from "../../../Types/Events";
import RenderItem from "../../Map/JoinedEvents/RenderItem";
import SearchBar from "../../../shared/Searcher/SearchBar";
import { Feather } from "@expo/vector-icons";
import _ from "lodash";
interface SearchEventsModalProps extends ModalProps {
  city: string;
  animateToRegion: (region: Region) => void;
  title?: JSX.Element;
  events: IEvent[];
}

const SearchEventsModal: React.FC<SearchEventsModalProps> = ({
  modalRef,
  onClose,
  animateToRegion,
  title,
  events,
}) => {
  //states
  const [searchText, setSearchText] = useState<string>();
  const [_events, setEvents] = useState<IEvent[]>(events);

  // variables
  const snapPoints = useMemo(() => ["50%", "70%"], []);
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

  function includesValue(tags: IEvent["tags"], formatQuery: string) {
    return tags!.some((element) => {
      console.log(element.toLowerCase().search(new RegExp(formatQuery, "i")));
      return element.search(new RegExp(formatQuery, "i")) >= 0;
    });
  }
  function filterEvents(event: IEvent, formatQuery: string) {
    if (
      event.title!.toLowerCase().includes(formatQuery) ||
      includesValue(event.tags, formatQuery)
    )
      return true;
    return false;
  }

  function handleSearch(text: string) {
    const formatQuery = text.toLowerCase();

    const data = _.filter(events, (event) => filterEvents(event, formatQuery));
    setEvents(data);
    setSearchText(text);
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
      topInset={insets.top}
    >
      <BottomSheetFlatList
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: insets.bottom },
        ]}
        ListHeaderComponent={
          <SearchBar
            icon={
              <Feather
                name="search"
                size={24}
                color={colors.accentColor}
                style={{ paddingRight: 5 }}
              />
            }
            onPressClear={() => setSearchText("")}
            containerStyle={styles.searchBarContainerStyle}
            style={{
              flex: 1,
              color: colors.text,
            }}
            placeholder={"Search parties by tag or title"}
            onChangeText={handleSearch}
            value={searchText}
          />
        }
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={_events}
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
  searchBarContainerStyle: {
    width: "100%",
    justifyContent: "center",
    marginVertical: "2%",
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

export default SearchEventsModal;
