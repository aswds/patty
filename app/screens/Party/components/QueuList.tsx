import { useState } from "react";
import axios from "axios";
import { TextInput, View } from "react-native";
import Button from "../../../shared/Buttons/Button";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../../src/colors";

const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";

interface Track {
  uri: string;
  name: string;
  artist: string;
  album: string;
}

const addToQueue = async (accessToken: string, track: Track) => {
  const searchResponse = await axios.get(
    `${SPOTIFY_API_BASE_URL}/search?type=track&q=${encodeURIComponent(
      track.name + " " + track.artist
    )}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const trackUri = searchResponse.data.tracks.items[0].uri;

  await axios.post(
    `${SPOTIFY_API_BASE_URL}/me/player/queue?uri=${encodeURIComponent(
      trackUri
    )}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

const getNextThreeTracksInQueue = async (accessToken: string) => {
  const queueResponse = await axios.get(
    `${SPOTIFY_API_BASE_URL}/me/player/queue?market=from_token&limit=3`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const nextTracks = queueResponse.data.items.map((item: any) => ({
    uri: item.track.uri,
    name: item.track.name,
    artist: item.track.artists[0].name,
    album: item.track.album.name,
  }));

  return nextTracks;
};

export const QueueList = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [inputValue, setInputValue] = useState("");

  const accessToken = "YOUR_ACCESS_TOKEN_HERE";

  const handleAddToQueue = async () => {
    const [name, artist] = inputValue.split(" - ");
    const track: Track = { uri: "", name, artist, album: "" };
    await addToQueue(accessToken, track);
    const nextTracks = await getNextThreeTracksInQueue(accessToken);
    setTracks(nextTracks);
  };

  return (
    <LinearGradient
      colors={[colors.accentColor, colors.background]}
      start={{ x: 0.5, y: 1 }}
    >
      <TextInput value={inputValue} onChange={(text) => setInputValue(text)} />
      <Button onPress={handleAddToQueue} text="Add to queue" />
      {tracks.map((track, i) => (
        <View key={i}>
          {track.name} - {track.artist} - {track.album}
        </View>
      ))}
    </LinearGradient>
  );
};
