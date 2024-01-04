const userModel = require("../models/user");

const fetch_get = async (req, res) => {
  const playerName = req.params.playerName;

  // let [firstName, lastName] = playerFullname.split("_");

  // const playerNameURL = `https://transfermarkt-api.vercel.app/players/search/${firstName}%20${lastName}?page_number=1`;

  const playerProfileURL = `https://thesportsdb.com/api/v1/json/3/searchplayers.php?p=${playerName}`;
  let playerNationality = "";
  let latLng = [];
  let playerProfile;

  console.log("inside fetch");

  try {
    fetch(playerProfileURL)
      .then((response) => response.json())
      .then((data) => {
        playerNationality = data.player[0].strNationality;
        playerProfile = { profile: data.player[0] };
        console.log(`nation: ${playerNationality}`);

        // fetching latLng of player home***
        const latLngFinderURL = ` https://geocode.maps.co/search?q=${playerNationality}&api_key=659560f28b979925576806zxt6afecf`;
        if (playerNationality) {
          fetch(latLngFinderURL)
            .then((res) => res.json())
            .then((data) => {
              latLng.push(data[0].lat);
              latLng.push(data[0].lon);
              console.log(`lat: ${latLng[0]}, lng: ${latLng[1]}`);

              res.json({
                data: {
                  profile: playerProfile,
                  homeLatLng: latLng,
                },
              });
            })
            .catch((err) => console.log(err.message));
        } else {
          res.json({
            data: {
              profile: playerProfile,
              homeLatLng: [],
            },
          });
        }

        // res.json({ profile: data.player[0] });
        // playerId = parseInt(data.results[0].id);
        // const playerProfileURL = `https://transfermarkt-api.vercel.app/players/${playerId}/profile`;

        // if (playerId) {
        //   fetch(playerProfileURL)
        //     .then((response) => response.json())
        //     .then((data) => {
        //       console.log(`profile: ${data}`);
        //       res.json({ profile: data });
        //     })
        //     .catch((err) => console.log(err));
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
    res.json({ err: error });
  }
};

module.exports = { fetch_get };

// ***
// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors());

// app.listen("4000", () => {
//   console.log("listening at port 4000...");
// });

// let playerId;

// app.get("/:playerName", async (req, res) => {
//   const playerFullname = req.params.playerName;

//   let [firstName, lastName] = playerFullname.split("_");

//   const playerNameURL = `https://transfermarkt-api.vercel.app/players/search/${firstName}%20${lastName}?page_number=1`;

//   fetch(playerNameURL)
//     .then((response) => response.json())
//     .then((data) => {
//       playerId = parseInt(data.results[0].id);
//       const playerProfileURL = `https://transfermarkt-api.vercel.app/players/${playerId}/profile`;

//       if (playerId) {
//         fetch(playerProfileURL)
//           .then((response) => response.json())
//           .then((data) => {
//             console.log(`profile: ${data}`);
//             res.json({ profile: data });
//           })
//           .catch((err) => console.log(err));
//       }
//     })
//     .catch((err) => console.log(err));
// });

// working right now
// async (req, res) => {
//   const playerName = req.params.playerName;

//   // let [firstName, lastName] = playerFullname.split("_");

//   // const playerNameURL = `https://transfermarkt-api.vercel.app/players/search/${firstName}%20${lastName}?page_number=1`;

//   const playerProfileURL = `https://thesportsdb.com/api/v1/json/3/searchplayers.php?p=${playerName}`;

//   try {
//     fetch(playerProfileURL)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(`profile: ${data.player}`);
//         res.json({ profile: data.player[0] });
//         // res.json({ profile: data.player[0] });
//         // playerId = parseInt(data.results[0].id);
//         // const playerProfileURL = `https://transfermarkt-api.vercel.app/players/${playerId}/profile`;

//         // if (playerId) {
//         //   fetch(playerProfileURL)
//         //     .then((response) => response.json())
//         //     .then((data) => {
//         //       console.log(`profile: ${data}`);
//         //       res.json({ profile: data });
//         //     })
//         //     .catch((err) => console.log(err));
//         // }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   } catch (error) {
//     console.log(error);
//     res.json({ err: error });
//   }
// };
