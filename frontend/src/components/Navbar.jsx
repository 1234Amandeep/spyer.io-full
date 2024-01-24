import React, { useContext } from "react";
import { Link } from "react-router-dom";
import userContext from "../context/userContext";
import favListContext from "../context/favListContext";
import PlayerProfileContext from "../context/PlayerProfileContext";

export default function Navbar() {
  const { user, setUser } = useContext(userContext);
  const { setFavList } = useContext(favListContext);
  const { playerProfile, setPlayerProfile } = useContext(PlayerProfileContext);

  // handle logout
  const handleLogout = async () => {
    const res = await fetch("https://spyer-io-api.onrender.com/logout", {
      method: "GET",
      credentials: "include",
    });

    setUser(null);
    setFavList([]);
    if (playerProfile) {
      setPlayerProfile(null);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand">
        <div className="container ">
          <a className="navbar-brand" href="#">
            Spyer.io
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="offcanvas"
                  href="#offcanvasExample"
                  role="button"
                  aria-controls="offcanvasExample"
                >
                  <i className="fa-regular fa-heart"></i>
                </a>
              </li>
              {user ? (
                <>
                  <li className="nav-item email">
                    <Link to={"/"} className="nav-link text-primary ">
                      {user.email}
                    </Link>
                  </li>

                  <li className="nav-item">
                    <a
                      type="button"
                      onClick={handleLogout}
                      className="nav-link"
                    >
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to={"/signup"} className="nav-link">
                      Signup
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      LogIn
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <hr className="shadow-lg p-3 mb-5 bg-body rounded" />
    </>
  );
}
