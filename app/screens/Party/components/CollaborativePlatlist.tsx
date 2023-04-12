import { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  setDoc,
  addDoc,
} from "firebase/firestore";

// Define the types for the playlist and song objects
interface Song {
  id: string;
  title: string;
  artist: string;
}

interface Playlist {
  id: string;
  name: string;
  songs: Song[];
}

const CollaborativePlaylistScreen = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [newSongTitle, setNewSongTitle] = useState("");
  const [newSongArtist, setNewSongArtist] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
    null
  );

  // Initialize Firebase with your app's credentials

  // Load the user's playlists from Firebase when the component mounts
  useEffect(() => {
    const db = getFirestore();
    const unsubscribe = onSnapshot(collection(db, "playlists"), (snapshot) => {
      const newPlaylists = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Playlist[];
      setPlaylists(newPlaylists);
    });

    return () => unsubscribe();
  }, []);

  // Create a new playlist in Firebase
  const createPlaylist = async () => {
    if (!playlistName) {
      return;
    }

    const db = getFirestore();
    const playlistRef = doc(collection(db, "playlists"));
    await setDoc(playlistRef, {
      name: playlistName,
      songs: [],
    });
    setPlaylistName("");
  };

  // Add a new song to the selected playlist in Firebase
  const addSong = async () => {
    if (!newSongTitle || !newSongArtist || !selectedPlaylist) {
      return;
    }

    const db = getFirestore();
    const songRef = collection(db, "playlists", selectedPlaylist.id, "songs");
    await addDoc(songRef, {
      title: newSongTitle,
      artist: newSongArtist,
    });
    setNewSongTitle("");
    setNewSongArtist("");
  };

  // Select a playlist
  const selectPlaylist = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
  };

  return (
    <View>
      <Text>Create a new playlist:</Text>
      <TextInput value={playlistName} onChangeText={setPlaylistName} />
      <Button title="Create" onPress={createPlaylist} />

      <Text>Select a playlist:</Text>
      {playlists.map((playlist) => (
        <Button
          key={playlist.id}
          title={playlist.name}
          onPress={() => selectPlaylist(playlist)}
        />
      ))}

      {selectedPlaylist && (
        <View>
          <Text>Add a new song to {selectedPlaylist.name}:</Text>
          <TextInput
            placeholder="Song title"
            value={newSongTitle}
            onChangeText={setNewSongTitle}
          />
          <TextInput
            placeholder="Artist"
            value={newSongArtist}
            onChangeText={setNewSongArtist}
          />
          <Button title="Add" onPress={addSong} />

          <Text>Songs:</Text>
          {selectedPlaylist.songs.map((song) => (
            <View key={song.id}>
              <Text>
                {song.title} by {song.artist}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default CollaborativePlaylistScreen;
