import { MutableRefObject } from "react";
import BottomSheet from "@gorhom/bottom-sheet";

export type ModalProps = {
  modalRef?: MutableRefObject<BottomSheet>;
  onClose?: () => void;
  visible?: boolean;
};
