import { ResizeMode, Video } from "expo-av";
import "firebase/storage";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { MediaItem } from "../../../../Types/Events";
import { PartyNavigationScreenProps } from "../../../../Types/PartyStack/NavigationTypes";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import {
  startUpload,
  updateUploadProgress,
  uploadCompressing,
  uploadFailure,
  uploadSuccess,
} from "../../../../redux/actions/UploadPosts";
import BigButton from "../../../../shared/Buttons/BigButton";
import Input from "../../../../shared/Input/Input";
import { Screen } from "../../../../shared/Screen/Screen";
import { colors } from "../../../../src/colors";
import NavigationBar from "../../../Map/PartyCreationScreens/NavigationBar";
import MediaComponent from "./PickMedia";
import { uploadPartyPost } from "./firebasePostFunctions";
import { doc } from "firebase/firestore";
import { db } from "../../../../../firebase";
const PostUploadScreen: React.FC<
  PartyNavigationScreenProps<"PostUploadScreen">
> = ({ navigation, route }) => {
  const { uid, username, name, surname, image, events } = useTypedSelector(
    (state) => state.user_state.current_user
  );
  const { onEvent } = events;

  const [description, setDescription] = useState<string>("");
  const [media, setMedia] = useState<MediaItem>(route.params?.media);
  const [partyStartTime, setPartyStartTime] = useState(
    route.params?.partyStartTime
  );
  const dispatch = useDispatch();
  const postData = {
    description: description,
    user: {
      uid,
      username,
      name,
      surname,
      image,
    },
    eventStartTime: new Date(partyStartTime).getTime(),
  };
  const handleMediaPick = async () => {
    navigation.navigate("MediaListToUpload");
  };
  useEffect(() => {
    if (route.params?.media) {
      setMedia(route.params.media);
    }
  }, [route.params?.media]);
  useEffect(() => {
    if (route.params?.partyStartTime) {
      setPartyStartTime(route.params.partyStartTime);
    }
  }, [route.params?.partyStartTime]);

  function updateProgress(progress: number) {
    dispatch(updateUploadProgress(progress));
  }
  function uploadedSuccessfully() {
    dispatch(uploadSuccess());
  }

  function uploadFailed(error: string) {
    dispatch(uploadFailure(error));
  }
  function updateCompressStatus(isCompressionRunning: boolean) {
    dispatch(uploadCompressing(isCompressionRunning));
  }
  async function handleUploadPress() {
    if (!_.isEmpty(media) && onEvent) {
      dispatch(startUpload());
      await uploadPartyPost(
        media.uri,
        postData,
        onEvent,
        media.mediaType,
        navigation,
        updateProgress,
        uploadedSuccessfully,
        updateCompressStatus
      )
        .then(() => {})
        .catch((error) => uploadFailed(error?.message));
    }
  }

  return (
    <Screen
      navigationBar={<NavigationBar text="Upload" navigation={navigation} />}
    >
      <View style={styles.container}>
        {media && !_.isEmpty(media) && (
          <View style={styles.mediaContainer}>
            {media?.mediaType === "photo" ? (
              <Image source={{ uri: media.uri }} style={styles.mediaImage} />
            ) : (
              <Video
                source={{ uri: media.uri }}
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
        onPress={handleUploadPress}
        disabled={_.isEmpty(media)}
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
