import React, { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function useUserImage(uri) {
  const [image, setImage] = useState();
  const noImage = require("../../assets/images/noImage-01.png");
  useEffect(() => {
    if (uri) {
      fetch(uri)
        .then(() => setImage({ uri }))
        .catch(() => {
          Alert.alert("Can`t load user image");
          setImage(noImage);
        });
    } else {
      setImage(noImage);
    }
  }, []);

  return { image };
}
