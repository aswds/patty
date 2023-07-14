import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { AnnouncementType } from "../../../../Types/Events";
import { colors } from "../../../../src/colors";
import UserContainer from "../PostFlatlist/Post/UserContainer";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import {
  AlertConfig,
  pickAlertText,
} from "../../../Map/helpers/pickAnAlertType";
import BoldText from "../../../../shared/Text/BoldText";

interface AnnouncementItemProps {
  item: AnnouncementType;
  current_user_uid: string;
  partyId: string;
  onPress: () => void;
  handleAlertError: (config: AlertConfig, onCancelCallback: () => void) => void;
}

const AnnouncementItem = ({
  item,
  current_user_uid,
  partyId,
  onPress,
  handleAlertError,
}: AnnouncementItemProps) => {
  const { user, createdAt, title, announcement } = item;

  const handleDelete = async () => {
    // Check if the current user is the creator of the announcement
    if (user?.uid === current_user_uid) {
      const db = getFirestore();
      const announcementRef = doc(
        db,
        `PARTIES_POSTS`,
        `${partyId}`,
        `USERS_ANNOUNCEMENTS`,
        `${item.id}`
      );
      await deleteDoc(announcementRef);
    }
  };

  function onDelete() {
    handleAlertError(pickAlertText("deleteAnnouncement"), handleDelete);
  }

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.announcementText} numberOfLines={3}>
          {announcement}
        </Text>
        <View style={styles.userInfo}>
          <UserContainer user={user} />
          {/* <Text style={styles.createdAt}>{moment().date(createdAt)}</Text> */}
        </View>
      </View>
      {user?.uid === current_user_uid && (
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <BoldText textStyles={styles.deleteButtonText}>Delete</BoldText>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default AnnouncementItem;

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    maxHeight: 200,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: "dashed",
    marginRight: 20,
    borderColor: colors.accentColor,
    backgroundColor: colors.modalBackground,
    alignItems: "center",
    width: 350,
  },
  avatar: {
    width: 30,
    aspectRatio: 1,
    borderRadius: 25,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: FontFamily.bold,
    marginBottom: 5,
    color: colors.text,
  },
  announcementText: {
    marginBottom: 5,
    fontFamily: FontFamily.regular,

    maxWidth: 200,
    color: "#555",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  userName: {
    fontWeight: "bold",
    color: "#444",
  },
  createdAt: {
    color: "#888",
  },
  deleteButton: {
    backgroundColor: colors.buttonBG,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: colors.buttonText,
    fontWeight: "bold",
  },
});
