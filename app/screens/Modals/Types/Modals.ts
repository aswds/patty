import { ForwardedRef, MutableRefObject } from "react";
import BottomSheet from "@gorhom/bottom-sheet";

export type ModalProps = {
  modalRef?: ForwardedRef<BottomSheet>;
  onClose?: () => void;
  visible?: boolean;
};
