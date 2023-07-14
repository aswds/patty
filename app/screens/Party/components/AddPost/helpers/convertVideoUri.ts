import { getAssetInfoAsync } from "expo-media-library";
import { MediaItem } from "../../../../../Types/Events";

export const convertVideoUri = async (
  mediaItem: MediaItem
): Promise<MediaItem> => {
  try {
    const asset = await getAssetInfoAsync(mediaItem.id);
    if (asset && asset.localUri) {
      return { ...mediaItem, uri: asset.localUri };
    } else {
      return mediaItem;
    }
  } catch (error) {
    return mediaItem;
  }
};
