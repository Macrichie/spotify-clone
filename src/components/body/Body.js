import React from "react";
import "./Body.css";
import Header from "../header/Header";
import { useContextValue } from "../../datalayer/DataLayer";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "../song-row/SongRow";

function Body({ spotify }) {
  const [{ discover_weekly }, dispatch] = useContextValue();

  const playPlaylist = () => {
    spotify
      .play({
        context_uri: `spotify:playlist:37i9dQZEVXcJeDNQPx7OFf`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  return (
    <div className="body__wrapper">
      <Header spotify={spotify} />
      <div className="body">
        {/* <Header spotify={spotify} /> */}

        <div className="body__info">
          <img src={discover_weekly?.images[0].url} alt="" />
          <div className="body__infoText">
            <strong>PLAYLIST</strong>
            <h2>Discover Weekly</h2>
            <p>{discover_weekly?.description}</p>
          </div>
        </div>

        <div className="body__songs">
          <div className="body__icons">
            <PlayCircleFilledIcon
              className="body__shuffle"
              onClick={playPlaylist}
            />
            <FavoriteIcon className="body__favoriteIcon" fontSize="large" />
            <MoreHorizIcon />
          </div>

          {discover_weekly?.tracks.items.map((item) => (
            <SongRow key={item.id} track={item.track} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Body;
