import { isAndroid } from "../../../../../src/platform";
import { IOSModal } from "../IOSModal";

export const _showModalHandle = (setImage, setShowModal) => {
  !isAndroid && IOSModal(setImage);
  setShowModal(isAndroid);
};
