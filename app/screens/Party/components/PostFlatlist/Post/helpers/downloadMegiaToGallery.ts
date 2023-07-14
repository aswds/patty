import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
export const downloadMediaToGallery = async (
  url: string,
  albumName: string
) => {
  try {
    // Extract the file name from the URL
    const fileName = url.split("/").pop()?.split("%2F").pop()?.split("?")[0];

    if (!fileName) {
      throw new Error("Invalid URL");
    }

    // Download the media file using Expo's FileSystem
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    await FileSystem.downloadAsync(url, fileUri);

    // Check if the album already exists
    const album = await MediaLibrary.getAlbumAsync(albumName);
    let albumAsset: MediaLibrary.Asset | null = null;

    if (album) {
      // Album exists, add the asset to it
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.addAssetsToAlbumAsync([asset], album);
      albumAsset = asset;
    } else {
      // Album doesn't exist, create a new album and add the asset to it
      const newAlbum = await MediaLibrary.createAlbumAsync(albumName);
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.addAssetsToAlbumAsync([asset], newAlbum);
      albumAsset = asset;
    }

    // Save the downloaded file to the album
  } catch (error) {
    console.error("Error downloading media:", error);
  }
};
