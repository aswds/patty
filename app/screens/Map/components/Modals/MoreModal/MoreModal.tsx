import React from "react";
import { View } from "react-native";
import ModalLayout from "../ModalLayout";

interface FavoriteModalProps {
  visible: boolean;
  hideModal: () => void;
}

const FavoriteModal = ({ visible, hideModal }: FavoriteModalProps) => {
  return (
    <ModalLayout visible={visible} hideModal={hideModal}>
      <View style={{}}></View>
    </ModalLayout>
  );
};

export default FavoriteModal;
