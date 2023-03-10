import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useTypedSelector } from "./useTypedSelector";

export default function useUserImage() {
  const [returnImage, setReturnImage] = useState();
  const { image } = useTypedSelector((state) => state.user_state.current_user);
  const noImage = require("../../assets/images/noImage-01.png");
  useEffect(() => {
    if (image) {
      fetch(image)
        .then(() => setReturnImage({ uri: image }))
        .catch(() => {
          Alert.alert("Can`t load user image");
          setReturnImage(noImage);
        });
    }
  }, []);

  return { returnImage };
}
