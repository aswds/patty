import { Dispatch, SetStateAction } from "react";
import { AlertConfig } from "./pickAnAlertType";

export interface IAlertHandleType {
  setAlertError: Dispatch<SetStateAction<AlertConfig>>;
  setShowAlertModal: Dispatch<SetStateAction<boolean>>;
  title: string;
  message: string;
  cancelText?: string;
  onCancelCallback?: () => void;
  okText?: string;
}

// export function handleAlertError(
//   setAlertError: Dispatch<SetStateAction<AlertConfig>>,
//   setShowAlertModal: Dispatch<SetStateAction<boolean>>,
//   title: string,
//   message: string,
//   cancelText?: string,
//   onCancelCallback?: () => void,
//   okText?: string
// ) {
//   setAlertError({ title, message, cancelText, okText, onCancelCallback });

//   setShowAlertModal(true);
// }

export function handleAlertError(
  setAlertError: Dispatch<SetStateAction<AlertConfig>>,
  setShowAlertModal: Dispatch<SetStateAction<boolean>>,
  config: AlertConfig,
  onCancelCallback?: () => void,
  onOkCallback?: () => void
) {
  const { message, title, cancelText, okText } = config;
  const alertConfig: AlertConfig = {
    title: title,
    message: message,
    cancelText: cancelText,
    okText: okText,
    onCancelCallback: onCancelCallback,
    onOkCallback: onOkCallback,
  };

  setAlertError(alertConfig);
  setShowAlertModal(true);
}
