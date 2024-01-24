import React, { useContext, useState } from "react";
import PlayerProfileContext from "../context/PlayerProfileContext";

export default function Searchbar() {
  const [playerName, setPlayerName] = useState("");

  const { setPlayerProfile } = useContext(PlayerProfileContext);

  const handleChange = (e) => {
    setPlayerName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(playerName);

    let queryName = playerName.replace(" ", "_");

    getPlayerProfile(queryName);
    setPlayerName("");
  };

  const getPlayerProfile = async (queryName) => {
    fetch(`https://spyer-io-api.onrender.com/fetch/${queryName}`)
      .then((response) => response.json())
      .then(({ data }) => {
        let temp = data.profile.profile;
        let lat, lng;
        if (data.homeLatLng.length > 0) {
          lat = parseFloat(data.homeLatLng[0]);
          lng = parseFloat(data.homeLatLng[1]);
        }

        let Profile = {
          idPlayer: temp.idPlayer,
          idTeam: temp.idTeam,
          imageURL: temp.strCutout,
          name: temp.strPlayer,
          currentClub: temp.strTeam, //edit club.joined, club.name
          shirtNumber: temp.strNumber,
          status: temp.strStatus, //marketValue to isactiive
          description: temp.strDescriptionEN, //big string
          citizenship: temp.strNationality, //[] was previously
          dateOfBirth: temp.dateBorn,
          placeOfBirth: temp.strBirthLocation, //{
          //   city: "",
          //   country: "",
          // }
          height: temp.strHeight,
          position: temp.strPosition,
          //  {
          //   main: "",
          //   other: [],
          // }
          foot: temp.strSide,
          outfitter: temp.strKit,
          latLng: [lat, lng],
        };
        console.log("profile: " + Profile.name);
        console.log(Profile);
        setPlayerProfile(Profile);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <section
        className="search-outer container"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="search ms-5 me-5 mb-5 ">
          <form className="search-inner ">
            <button className="search-button" type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <input
              type="text"
              className="search-input "
              placeholder="Player's name"
              onChange={(e) => handleChange(e)}
              value={playerName}
              aria-label="Player's name"
              aria-describedby="basic-addon2"
            />
          </form>
        </div>
      </section>
    </>
  );
}
