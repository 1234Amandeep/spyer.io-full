import React, { useContext, useEffect } from "react";
import favListContext from "../context/favListContext";
import userContext from "../context/userContext";

export default function ListItem({ item }) {
  const { favList, setFavList } = useContext(favListContext);
  const { user } = useContext(userContext);

  const removeItem = async () => {
    const temp = favList.filter((element) => {
      return element.idPlayer != item.idPlayer;
    });

    localStorage.setItem("favList", JSON.stringify(temp));

    setFavList(temp);

    if (user) {
      // remove from db
      const res = await fetch(
        `https://spyer-io-api.onrender.com/removeFromWishlist`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ favList: temp }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      console.log(data);
    }
  };

  return (
    <>
      <li className="list-group-item d-flex justify-content-between">
        <span className="ms-0 ps-0">{item.name} </span>&nbsp;&nbsp;
        <span className="">
          <a
            type="button"
            onClick={removeItem}
            className="btn-danger btn-sm text-dark"
          >
            <i className="fa-solid fa-trash"></i>
          </a>
        </span>
      </li>
    </>
  );
}
