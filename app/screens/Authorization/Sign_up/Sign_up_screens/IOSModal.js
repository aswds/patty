import { ActionSheetIOS } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { _imagePropHandler } from "./AvatarFunctions/ACFunctions";

export function IOSModal(setImage) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      presentationStyle: ImagePicker.UIImagePickerPresentationStyle.AUTOMATIC,
    });
    if (!result.canceled) {
      _imagePropHandler(setImage, result.assets[0].uri);
    }
  };
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: ["Pick a picture", "Cancel"],
      cancelButtonIndex: 1,
      destructiveButtonIndex: 1,
      userInterfaceStyle: "dark",
    },
    (buttonIndex) => {
      if (buttonIndex === 0) {
        pickImage();
      } else if (buttonIndex === 1) {
      }
    }
  );
}
