import { Dispatch, SetStateAction } from "react";
import { AlertConfig } from "./pickAnAlertType";

export function handleAlertError(
  setAlertError: Dispatch<SetStateAction<AlertConfig>>,
  setShowAlertModal: Dispatch<SetStateAction<boolean>>,
  title: string,
  message: string,
  cancelText?: string,
  onCancelCallback?: () => void,
  okText?: string
) {
  setAlertError({ title, message, cancelText, okText, onCancelCallback });

  setShowAlertModal(true);
}
