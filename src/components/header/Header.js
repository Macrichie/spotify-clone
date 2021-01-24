import React, { useEffect } from "react";
import "./Header.css";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useContextValue } from "../../datalayer/DataLayer";

function Header({ spotify }) {
  const [{ user }, dispatch] = useContextValue();

  return (
    <div className="header">
      <div className="header__left">
        <SearchIcon className="header__searchIcon"/>
        <input placeholder="Search for Artists, Songs, or Podcast" type="text" />
      </div>
      <div className="header__right">
        <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;
