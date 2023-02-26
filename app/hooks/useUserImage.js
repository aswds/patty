import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useTypedSelector } from "./useTypedSelector";

export default function useUserImage(uri) {
  const [image, setImage] = useState();
  const { userImage } = useTypedSelector(
    (state) => state.user_state.current_user
  );
  const noImage = require("../../assets/images/noImage-01.png");
  useEffect(() => {
    if (userImage) {
      fetch(userImage)
        .then(() => setImage({ uri: userImage }))
        .catch(() => {
          Alert.alert("Can`t load user image");
          setImage(noImage);
        });
    }
  }, []);

  return { image };
}
