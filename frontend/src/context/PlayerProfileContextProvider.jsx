import React, { useState } from "react";
import PlayerProfileContext from "./PlayerProfileContext";

function PlayerProfileContextProvider({ children }) {
  const [playerProfile, setPlayerProfile] = useState(null);
  return (
    <PlayerProfileContext.Provider value={{ playerProfile, setPlayerProfile }}>
      {children}
    </PlayerProfileContext.Provider>
  );
}

export default PlayerProfileContextProvider;
