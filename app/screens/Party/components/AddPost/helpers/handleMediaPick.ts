import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { Video } from "expo-av";
import { Alert } from "react-native";
import { Dispatch, SetStateAction } from "react";

export const handleMediaPick = async (
  setMedia: Dispatch<SetStateAction<ImagePicker.ImagePickerSuccessResult>>
) => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Permission Denied",
      "Please grant permission to access media."
    );
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    quality: 1, // Adjust the quality as desired, 1 means no compression
    allowsEditing: true,
  });

  if (!result.canceled) {
    if (result.assets[0].type === "video") {
      const compressedUri = await compressVideo(result.assets[0].uri);
      setMedia({
        ...result,
        assets: [{ ...result.assets[0], uri: compressedUri }],
      });
    } else {
      setMedia(result);
    }
  }
};

const compressVideo = async (videoUri) => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== "granted") {
    console.error("Permission not granted!");
    return videoUri;
  }

  const compressedUri = await Video.convertMovToMp4Async(videoUri);
  return compressedUri;
};
