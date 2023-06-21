import { Feather } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { MediaItem } from "../../../../Types/Events";

interface PartyUploadItemProps {
  item: MediaItem;
  handleSelectMedia: (media: MediaItem) => void;
  selected?: boolean;
}

const MediaItemToUpload: React.FC<PartyUploadItemProps> = ({
  item,
  handleSelectMedia,
  selected,
}) => {
  return (
    <TouchableOpacity
      onPress={() => handleSelectMedia(item)}
      activeOpacity={0.8}
      style={styles.imageContainer}
    >
      <Image source={{ uri: item.uri }} style={styles.image} />
      {item.mediaType === "video" && (
        <View style={styles.durationContainer}>
          <Text style={styles.durationTextStyle}>{item.duration}</Text>
        </View>
      )}
      {selected && (
        <View style={styles.iconContainer}>
          <Feather name="check-circle" size={24} color="white" />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default MediaItemToUpload;

const { width } = Dimensions.get("window");
const imageWidth = (width - 30) / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  iconContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 5,
    alignItems: "center",
  },
  contentContainer: {
    paddingVertical: 5,
  },
  durationTextStyle: {
    color: "white",
    fontFamily: FontFamily.medium,
    fontSize: 11,
  },
  durationContainer: {
    position: "absolute",
    zIndex: 1,

    top: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    borderRadius: 5,
  },
  imageContainer: {
    flex: 1,
    margin: 5,
    width: imageWidth,
    aspectRatio: 1,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    borderRadius: 5,

    overflow: "hidden",
  },
});
