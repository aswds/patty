import React from "react";
import { View, Modal, Text, TouchableOpacity, StyleSheet } from "react-native";
import RedButton from "../../../shared/Buttons/CloseButton";
import { colors } from "../../../src/colors";
import BoldText from "../../../shared/Text/BoldText";

interface PartyRadiusAlertModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const PartyRadiusAlertModal: React.FC<PartyRadiusAlertModalProps> = ({
  isVisible,
  onClose,
}) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <BoldText textStyles={styles.title}>
            Party Zone Escapee Alert! 🏃
          </BoldText>
          <BoldText textStyles={styles.message}>
            Uh-oh! It seems you've ventured outside the party zone.
          </BoldText>

          <RedButton onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",

    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,

    textAlign: "center",
  },
  message: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 4,
    alignSelf: "flex-end",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});

export default PartyRadiusAlertModal;
