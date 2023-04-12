import { API_BASE_URL } from "./config";

const fetchSpotifyData = async (path, token) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

const getMyPlaylists = async (token) => {
  const data = await fetchSpotifyData("/me/playlists", token);
  return data.items;
};

const getPlaylistTracks = async (playlistId, token) => {
  const data = await fetchSpotifyData(`/playlists/${playlistId}/tracks`, token);
  return data.items;
};

const getTrack = async (trackId, token) => {
  const data = await fetchSpotifyData(`/tracks/${trackId}`, token);
  return data;
};
