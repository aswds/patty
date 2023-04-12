import React, { useState } from "react";
import { WebView } from "react-native-webview";

const SpotifyLoginScreen = () => {
  const [token, setToken] = useState("");

  const onNavigationStateChange = (state) => {
    const { url } = state;
    if (url.startsWith(REDIRECT_URI)) {
      const [, token] = url.match(/access_token=([^&]+)/);
      setToken(token);
    }
  };

  const uri = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=user-read-private%20user-read-email%20playlist-read-private`;

  return (
    // <WebView
    //   source={{ uri }}
    //   onNavigationStateChange={onNavigationStateChange}
    // />
  );
};

export default SpotifyLoginScreen;
