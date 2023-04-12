import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { JoinedEventsRouteProps } from "../../../Types/MapStack/RouteTypes";
import { fetch_joined_events } from "../../../redux/actions/Events";
import { IEvent } from "../../../Types/Events";
import RenderItem from "./RenderItem";
import { Region } from "react-native-maps";
import { Title } from "../../../shared/Title/Title";
import { colors } from "../../../src/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ListEmptyComponent from "../../../shared/UserList/ListEmptyComponent";
import { MapStackScreenProps } from "../../../Types/MapStack/ScreenNavigationProps";
import CustomRefreshControl from "../../../shared/RefreshControl/RefreshControl";

const JoinedEvents = ({ navigation }: MapStackScreenProps<"JoinedEvents">) => {
  const route = useRoute<JoinedEventsRouteProps>();
  const [joinedEvents, setJoinedEvents] = useState<IEvent[]>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const insets = useSafeAreaInsets();
  useEffect(() => {
    fetch_joined_events(route.params?.city)
      .then((events) => {
        setJoinedEvents(events);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [refreshing]);
  function onPress(item: IEvent) {
    navigation.navigate("Party", { partyData: item });
    // animateToRegion(region);
  }
  function onRefresh() {
    setRefreshing((refresh) => !refresh);
  }
  function renderItem({ item, index }: { item: IEvent; index: number }) {
    return (
      <RenderItem
        item={item}
        onPress={() => {
          onPress(item);
        }}
        key={index}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: insets.bottom, paddingTop: insets.top },
        ]}
        ListHeaderComponent={
          <Title
            title={"Selected"}
            description={"Here you will see the parties you have joined."}
            navigation={navigation}
          />
        }
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(event) => event.partyID!}
        data={joinedEvents}
        renderItem={renderItem}
        ListEmptyComponent={
          <ListEmptyComponent
            title="It looks like there's no one here"
            isLoading={!joinedEvents && isLoading}
          />
        }
        refreshControl={
          <CustomRefreshControl
            refreshing={refreshing}
            setRefreshing={setRefreshing}
          />
        }
      />
    </View>
  );
};

export default JoinedEvents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backgroundStyle: {
    backgroundColor: colors.modalBackground,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  contentContainer: {
    padding: 20,
  },
});
