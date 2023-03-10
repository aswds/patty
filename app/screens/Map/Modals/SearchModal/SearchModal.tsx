import React from "react";
import ModalLayout from "../ModalLayout";
import { ModalProps } from "../Types/Modals";

const SearchModal = ({ visible, onClose }: ModalProps) => {
  return <ModalLayout visible={visible} hideModal={onClose}></ModalLayout>;
};

export default SearchModal;
