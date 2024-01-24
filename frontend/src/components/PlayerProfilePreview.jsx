import React, { useContext } from "react";
import PlayerProfileContext from "../context/PlayerProfileContext";
import favListContext from "../context/favListContext";
import userContext from "../context/userContext";

export default function PlayerProfilePreview() {
  const { playerProfile, setPlayerProfile } = useContext(PlayerProfileContext);
  const { favList, setFavList } = useContext(favListContext);
  const { user } = useContext(userContext);

  if (!playerProfile) {
    return;
  }

  function contains(a, obj) {
    for (var i = 0; i < favList.length; i++) {
      if (a[i].idPlayer === obj.idPlayer) {
        return true;
      }
    }
    return false;
  }

  const addToWishlist = async () => {
    const isExists = contains(favList, playerProfile);
    console.log("outside addtowishlist if");
    if (!isExists) {
      console.log("inside addtowishlist if");
      const temp = [...favList, playerProfile];
      localStorage.setItem("favList", JSON.stringify(temp));

      setFavList([...favList, playerProfile]);

      // adding to db
      if (user) {
        const res = await fetch(
          "https://spyer-io-api.onrender.com/addToWishlist",
          {
            method: "POST",
            body: JSON.stringify({ favList: [...favList, playerProfile] }),
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        console.log(data);
      }

      setPlayerProfile(null);
    }
  };

  return (
    <>
      <section className="player-profile-preview-outer d-flex justify-content-center mt-md-5 mt-0">
        <div className="player-profile-preview ">
          <article
            className="card horizontal"
            onClick={addToWishlist}
            data-bs-toggle="offcanvas"
            href="#offcanvasExample"
            role="button"
            aria-controls="offcanvasExample"
          >
            <div className="card-inner">
              <span className="card-pin simple"></span>
              <div className="card-image">
                <img src={playerProfile.imageURL} />
              </div>
              <div className="card-content">
                <div className="card-meta">
                  <span className="card-meta-artist">{playerProfile.name}</span>
                  <button className="card-meta-button" style={{ opacity: "0" }}>
                    <i className="ai-circle-triangle-right-fill"></i>
                  </button>
                </div>

                <h2 className="card-title d-flex flex-column gap-1">
                  <div className="d-none d-sm-block">
                    {playerProfile.currentClub},&nbsp;{playerProfile.status}
                  </div>
                  <span className="card-time">{playerProfile.shirtNumber}</span>
                  <a className="nav-link">
                    <i type="button" className="fa-regular fa-heart"></i>
                  </a>
                  {/* <a
                    type="button"
                    onClick={addToWishlist}
                    className="wishlist-btn"
                  >
                    <i className="fa-regular fa-heart"></i>
                  </a> */}
                </h2>
              </div>
              <span className="card-pin simple"></span>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
