import React from "react";
import Search from "./Search";
import Map from "./Map";
import PlayerProfile from "./PlayerProfile";
import FavList from "../pages/FavList";

export default function Main() {
  return (
    <>
      <FavList />
      <Search />
      <Map />
      <PlayerProfile />
    </>
  );
}
