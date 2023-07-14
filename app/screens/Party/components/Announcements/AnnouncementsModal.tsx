import React from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { IEvent_User } from "../../../../Types/Events";
import BoldText from "../../../../shared/Text/BoldText";
import { colors } from "../../../../src/colors";
import { isAndroid } from "../../../../src/platform";
import RedButton from "../../../../shared/Buttons/CloseButton";

interface AnnouncementModalProps {
  title: string;
  announcement: string;
  user: IEvent_User;
  visible: boolean;
  onClose: () => void;
}

const AnnouncementModal: React.FC<AnnouncementModalProps> = ({
  title,
  announcement,
  user,
  visible,
  onClose,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <BoldText textStyles={styles.title}>{title}</BoldText>
          </View>
          <ScrollView style={styles.announcementContainer}>
            <BoldText textStyles={styles.announcement}>{announcement}</BoldText>
          </ScrollView>
          <Text style={styles.user}>
            {`Posted by: `}
            <BoldText textStyles={styles.nameTextStyle}>
              {user.name} {user.surname}
            </BoldText>
          </Text>
          <RedButton onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 20,
    overflow: "hidden",
    width: "80%",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  titleContainer: {
    margin: -20,
    padding: 20,
    backgroundColor: colors.modalBackground,
    marginBottom: 10,
  },
  nameTextStyle: { color: colors.text },
  announcement: {
    fontSize: 16,
    marginBottom: 10,
  },
  announcementContainer: { maxHeight: 500 },
  user: {
    fontSize: 14,
    color: colors.text_2,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: colors.buttonBG,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: colors.buttonText,
    fontFamily: FontFamily.bold,
  },
});

export default AnnouncementModal;
