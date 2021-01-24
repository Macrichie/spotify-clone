import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Login from "./components/login/Login";
import { getTokenFromResponse } from "./utils/spotify";
import Player from "./components/player/Player";
import { useContextValue } from "./datalayer/DataLayer";
import "./App.css";

const spotify = new SpotifyWebApi();

function App() {
  // gives access to the data-layer or context data
  const [{ user, token }, dispatch] = useContextValue();

  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash = "";
    const _token = hash.access_token;

    // Set token
    if (_token) {
      // set token
      spotify.setAccessToken(_token);

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      // set user info
      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });

      // set user playlists
      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });

      // get playlists
      spotify.getPlaylist("37i9dQZEVXcJeDNQPx7OFf").then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );
    }
  }, []);

  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
