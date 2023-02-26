import React from "react";
import * as ImagePicker from "expo-image-picker";
import {Alert, Platform} from "react-native";

export default function useGallery() {
  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Sorry, we need camera roll permissions to make this work!"
          );
        }
      }
    })();
  }, []);
}
