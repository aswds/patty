import { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { AnnouncementType } from "../../../../Types/Events";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { listenToUsersAnnouncements } from "../PostFlatlist/Post/helpers/listeners";
import AnnouncementItem from "./AnnouncementItem";
import AnnouncementModal from "./AnnouncementsModal";
import EmptyAnnouncementsList from "./EmptyAnnouncements";
import { fetchAnnouncements } from "./fetchAnnouncements";
import { AlertConfig } from "../../../Map/helpers/pickAnAlertType";

const Announcements = ({
  partyId,
  refreshing,
  handleAlertError,
}: {
  partyId: string;
  refreshing: boolean;
  handleAlertError: (config: AlertConfig, onCancelCallback: () => void) => void;
}) => {
  const [announcements, setAnnouncements] = useState<AnnouncementType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<AnnouncementType | null>(null);

  useEffect(() => {
    fetchAnnouncements(partyId).then((announs) => {
      setAnnouncements(announs);
    });
  }, [refreshing]);
  useEffect(() => {
    const listenerAnnouncements = listenToUsersAnnouncements(
      partyId,
      (announcements) => setAnnouncements(announcements)
    );

    return () => listenerAnnouncements();
  }, []);

  const handleAnnouncementPress = (announcement: AnnouncementType) => {
    setSelectedAnnouncement(announcement);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedAnnouncement(null);
  };
  const handlePress = () => {
    setModalVisible(true);
  };

  function renderAnnouncementItem({
    item,
    index,
  }: {
    item: AnnouncementType;
    index: number;
  }) {
    return (
      <AnnouncementItem
        onPress={() => handleAnnouncementPress(item)}
        item={item}
        key={index}
        current_user_uid={uid!}
        partyId={partyId}
        handleAlertError={handleAlertError}
      />
    );
  }

  const { uid } = useTypedSelector((state) => state.user_state.current_user);
  return (
    <View style={styles.container}>
      <FlatList
        data={announcements}
        renderItem={renderAnnouncementItem}
        style={{
          flex: 1,
          marginVertical: "5%",
          marginHorizontal: -20,
        }}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 20,
          flexGrow: 1,
        }}
        ListEmptyComponent={<EmptyAnnouncementsList />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      {selectedAnnouncement && (
        <AnnouncementModal
          title={selectedAnnouncement.title}
          announcement={selectedAnnouncement.announcement}
          user={selectedAnnouncement.user}
          visible={modalVisible}
          onClose={handleCloseModal}
        />
      )}
    </View>
  );
};

export default Announcements;

const styles = StyleSheet.create({
  container: {
    marginVertical: "5%",
    width: "100%",
  },
});
