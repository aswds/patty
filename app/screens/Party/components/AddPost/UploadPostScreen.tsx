import { ResizeMode, Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import "firebase/storage";
import React, { useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { PartyNavigationScreenProps } from "../../../../Types/PartyStack/NavigationTypes";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import BigButton from "../../../../shared/Buttons/BigButton";
import Input from "../../../../shared/Input/Input";
import { Screen } from "../../../../shared/Screen/Screen";
import { colors } from "../../../../src/colors";
import NavigationBar from "../../../Map/PartyCreationScreens/NavigationBar";
import MediaComponent from "./PickMedia";
import { uploadPartyPost } from "./uploadFileToFirebase";

const PostUploadScreen: React.FC<
  PartyNavigationScreenProps<"PostUploadScreen">
> = ({ navigation }) => {
  const { uid, username, name, surname, image, events } = useTypedSelector(
    (state) => state.user_state.current_user
  );

  const [description, setDescription] = useState<string>("");
  const [media, setMedia] =
    useState<ImagePicker.ImagePickerSuccessResult | null>(null);
  const postData = {
    description: description,
    user: { uid, username, name, surname, image },
  };
  const { onEvent } = events;
  const handleMediaPick = async () => {
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
      quality: 0.5,
      aspect: [4, 3],
      videoMaxDuration: 60,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setMedia(result);
    }
  };

  return (
    <Screen
      navigationBar={<NavigationBar text="Upload" navigation={navigation} />}
    >
      <View style={styles.container}>
        {media?.assets[0] && (
          <View style={styles.mediaContainer}>
            {media.assets[0].type === "image" ? (
              <Image
                source={{ uri: media.assets[0].uri }}
                style={styles.mediaImage}
              />
            ) : (
              <Video
                source={{ uri: media.assets[0].uri }}
                style={styles.mediaVideo}
                shouldPlay
                resizeMode={ResizeMode.CONTAIN}
                isLooping={true}
                useNativeControls
              />
            )}
          </View>
        )}
        <MediaComponent media={media} handleMediaPick={handleMediaPick} />

        <Input
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          isValid
          autoCorrect={false}
        />
      </View>
      <BigButton
        title="Upload"
        onPress={() => {
          if (media?.assets[0] && onEvent && media?.assets[0].type)
            uploadPartyPost(
              media.assets[0].uri,
              postData,
              onEvent,
              media.assets[0].type
            ).then(() => {
              navigation.goBack();
            });
        }}
        disabled={!media}
        style={styles.bigButton}
        textStyle={styles.bigButtonText}
      />
    </Screen>
  );
};

export default PostUploadScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  mediaContainer: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 30,
    overflow: "hidden",
  },
  mediaImage: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
    overflow: "hidden",
  },
  mediaVideo: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
    overflow: "hidden",
  },
  pickMediaButton: {
    backgroundColor: "rgba(155, 50, 50, 0.2)",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.accentColor,
    borderRadius: 20,
    width: "100%",
    aspectRatio: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
  },
  pickMediaButtonText: {
    color: colors.accentColor,
    fontFamily: FontFamily.bold,
    fontSize: 20,
  },
  pickMediaButtonIcon: {
    color: colors.accentColor,
  },
  input: {
    backgroundColor: colors.input,
    width: "100%",
    borderRadius: 20,
    marginTop: 0,
    marginVertical: "5%",
  },
  bigButton: {
    width: "100%",
    height: 60,
  },
  bigButtonText: {
    fontFamily: FontFamily.bold,
  },
});
