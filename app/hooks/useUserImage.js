import React from "react";
import { Alert } from "react-native";
export default function useUserImage(image) {
  const [fetchableImage, setStatus] = React.useState();
  if (image) {
    fetch(image)
      .then((res) => setStatus(res.ok))
      .catch((e) => {
        Alert.alert(`Can't download user image`), setStatus(false);
      });
  }

  return { fetchableImage };
}
