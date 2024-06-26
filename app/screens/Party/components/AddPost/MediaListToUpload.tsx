import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import _ from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Insets,
  LayoutAnimation,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { MediaItem } from "../../../../Types/Events";
import { PartyNavigationScreenProps } from "../../../../Types/PartyStack/NavigationTypes";
import BigButton from "../../../../shared/Buttons/BigButton";
import ListEmptyComponent from "../../../../shared/UserList/ListEmptyComponent";
import { colors } from "../../../../src/colors";
import { isAndroid } from "../../../../src/platform";
import NavigationBar from "../../../Map/PartyCreationScreens/NavigationBar";
import { joinedAtKey } from "../../helpers/cacheFunctions";
import MediaItemToUpload from "./MediaItemToUpload";
import { convertVideoUri } from "./helpers/convertVideoUri";
import { formatDuration } from "./helpers/formatVideoTime";

const MediaListToUpload: React.FC<
  PartyNavigationScreenProps<"MediaListToUpload">
> = ({ navigation }) => {
  const [startPartyTime, setPartyTime] = useState<Date>(new Date()); // Replace with your backend retrieval logic
  const [selectedMedia, setSelectedMedia] = useState<MediaItem>();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [showButton, setShowButton] = useState(false);
  const buttonAnimation = useRef(new Animated.Value(0)).current;

  const startButtonAnimation = () => {
    Animated.spring(buttonAnimation, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 1,
    }).start();
  };

  useEffect(() => {
    async function getJoinedDate() {
      await AsyncStorage.getItem(joinedAtKey).then((date) => {
        setPartyTime(new Date(date));
      });
    }
    getJoinedDate();
  }, []);

  useEffect(() => {
    getImages();
  }, [startPartyTime]);
  const getImages = useCallback(async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        // Handle permission denied
        return;
      }
      const media = await MediaLibrary.getAssetsAsync({
        mediaType: [MediaLibrary.MediaType.photo, MediaLibrary.MediaType.video],
        createdAfter: startPartyTime,
        first: 200,
        sortBy: "creationTime",
      });
      const mediaItems = media.assets.map((asset) => ({
        id: asset.id,
        uri: asset.uri,
        mediaType: asset.mediaType,
        duration:
          asset.mediaType === "video" ? formatDuration(asset.duration) : 0,
        selected: false,
      }));
      setMediaItems(mediaItems);
    } catch (error) {
      // Handle error
    }
  }, [startPartyTime]);

  const handleSelectMedia = (media: MediaItem) => {
    setMediaItems((prevMediaItems) =>
      prevMediaItems.map((item) => ({
        ...item,
        selected: item.id === media.id,
      }))
    );

    LayoutAnimation.configureNext({
      duration: 250,
      create: {
        duration: 250,
        property: LayoutAnimation.Properties.opacity,
        springDamping: 0.5,
        initialVelocity: 1,
        type: LayoutAnimation.Types.linear,
      },
    });

    setShowButton(true);
    setSelectedMedia(media);
  };

  const insets = useSafeAreaInsets();
  const styles = makeStyles(insets, showButton);
  function renderMediaItem({ item }: { item: MediaItem }) {
    return (
      <MediaItemToUpload
        item={item}
        handleSelectMedia={handleSelectMedia}
        selected={item?.selected}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={mediaItems}
        style={styles.flatList}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <NavigationBar navigation={navigation} text="Party moments" />
            <Text style={styles.headerText}>
              Upload videos/photos made after{" "}
              {`${startPartyTime.toDateString()}`}.
            </Text>
          </View>
        }
        ListEmptyComponent={
          <ListEmptyComponent
            style={{ marginTop: 0 }}
            title="You haven't captured any moments since you joined the party."
            icon={<Feather name="camera" size={45} color={colors.iconColor} />}
          />
        }
        contentContainerStyle={styles.contentContainer}
        maxToRenderPerBatch={4}
        initialNumToRender={4}
        windowSize={2}
        keyExtractor={(item) => item.id}
        renderItem={renderMediaItem}
      />

      {showButton && (
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              transform: [
                {
                  translateY: buttonAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [200, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <BigButton
            onPress={async () => {
              if (selectedMedia && !_.isEmpty(selectedMedia)) {
                const mediaWithConvertedURI = await convertVideoUri(
                  selectedMedia
                );
                navigation.navigate("PostUploadScreen", {
                  media: mediaWithConvertedURI,
                });
              }
            }}
            style={styles.button}
            title="pick"
            textStyle={{
              fontFamily: FontFamily.bold,
            }}
            onLayout={startButtonAnimation}
          />
        </Animated.View>
      )}
    </View>
  );
};
const makeStyles = (insets: Insets, showButton: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    flatList: {
      flex: 1,
      backgroundColor: colors.background,
      paddingBottom: showButton ? 60 : 0,
    },
    headerContainer: {
      marginBottom: 10,
    },
    headerText: {
      color: colors.text_2,
      marginVertical: 10,
      fontSize: 20,
      fontFamily: FontFamily.medium,
      // Add your header text styles here
    },
    contentContainer: {
      flexGrow: 1,
      paddingTop: insets.top,
      paddingBottom: showButton ? insets.bottom! + 60 : insets.bottom,
      paddingHorizontal: 20,
    },
    buttonContainer: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: isAndroid ? 20 : insets.bottom,

      alignItems: "center",
    },
    button: {
      height: 60,
      width: "90%",
    },
  });
export default MediaListToUpload;
