import React, { useContext, useState } from "react";
import PlayerProfileContext from "../context/PlayerProfileContext";
import PlayerProfilePreview from "./PlayerProfilePreview";
import Searchbar from "./Searchbar";

export default function Search() {
  const { playerProfile } = useContext(PlayerProfileContext);

  if (!playerProfile) {
    return <Searchbar />;
  }

  return (
    <>
      <Searchbar />
      <PlayerProfilePreview />
    </>
  );
}
