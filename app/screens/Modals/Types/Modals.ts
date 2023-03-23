import { Ref } from "react";
import BottomSheet from "@gorhom/bottom-sheet";

export type ModalProps = {
  modalRef?: Ref<BottomSheet>;
  onClose?: () => void;
  visible?: boolean;
};
