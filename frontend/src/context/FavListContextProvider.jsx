import React, { useState } from "react";
import favListContext from "./favListContext";

function FavListContextProvider({ children }) {
  let temp = JSON.parse(localStorage.getItem("favList"));
  if (!temp) {
    temp = [];
  }

  const [favList, setFavList] = useState(temp);

  return (
    <favListContext.Provider value={{ favList, setFavList }}>
      {children}
    </favListContext.Provider>
  );
}

export default FavListContextProvider;
