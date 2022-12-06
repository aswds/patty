import { ActionSheetIOS } from "react-native";
import * as ImagePicker from "expo-image-picker";

export function IOSModal(_imagePropHandler, setImage) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      presentationStyle: ImagePicker.UIImagePickerPresentationStyle.AUTOMATIC,
    });

    if (!result.cancelled) {
      _imagePropHandler(setImage, result.uri);
    }
  };
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: ["Pick a picture", "Cancle"],
      cancelButtonIndex: 1,
      destructiveButtonIndex: 1,
      userInterfaceStyle: "dark",
    },
    (buttonIndex) => {
      if (buttonIndex == 0) {
        pickImage();
      } else if (buttonIndex == 1) {
      }
    }
  );
}
