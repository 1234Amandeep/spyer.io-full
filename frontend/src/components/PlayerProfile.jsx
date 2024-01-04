import React, { useContext } from "react";
import PlayerProfileContext from "../context/PlayerProfileContext";
import "../style.css";

export default function PlayerProfile() {
  const { playerProfile } = useContext(PlayerProfileContext);
  let desc;
  if (!playerProfile) {
    return null;
  }

  return (
    <>
      <section
        className="player-profile-outer-container  mt-5"
        style={{ backgroundColor: "#f9bc73" }}
      >
        <div className="player-profile-inner-container container  pt-5">
          <title id="title">José Antonio Reyes</title>
          <h1 className="text-center text-dark">{playerProfile.name}</h1>
          <div id="img-div player-profile-img-container">
            <img
              id="player-img"
              src={playerProfile.imageURL}
              alt={playerProfile.name}
              className="player-profile-img"
            />
            <figcaption id="player-img-caption">
              {playerProfile.name} Plays for {playerProfile.citizenship}
            </figcaption>
          </div>
          <section
            id="scroll-reveal"
            className="player-description-container d-flex justify-content-center flex-column align-items-center text-dark"
          >
            <p className="player-description-content ">
              {playerProfile.description}
            </p>

            <section className="player-info">
              <p className="mb-5 text-decoration-underline fw-bold">
                Player Profile
              </p>
              <p>Full Name: {playerProfile.name}</p>
              <p>
                Date of Birth:
                {playerProfile.dateOfBirth}
              </p>
              <p>Place of Birth: {playerProfile.placeOfBirth}</p>

              <p>Height:{playerProfile.height}</p>
              <p>
                Citizenship:
                {playerProfile.citizenship}
              </p>
              <p>Position: {playerProfile.position}</p>
              <p>Foot: {playerProfile.foot}</p>
              <p>Outfitter: {playerProfile.outfitter}</p>
              <p>Shirt no.: {playerProfile.shirtNumber}</p>

              {/* <p>
                You can get full details using the{" "}
                <a
                  id="tribute-link"
                  href="https://en.wikipedia.org/wiki/Jos%C3%A9_Antonio_Reyes"
                  target="_blank"
                >
                  Wikipedia{" "}
                </a>{" "}
                link.
              </p> */}
            </section>
          </section>
        </div>
      </section>
    </>
  );
}

{
  /* <section
  className="player-profile-outer-container mb-0 "
  style={{ backgroundColor: "#f9bc73" }}
>
  <div className="player-profile-inner-container container mt-5 pt-5">
    <title id="title">José Antonio Reyes</title>
    <h1 className="text-center text-dark">{playerProfile.name}</h1>
    <div id="img-div">
      <img
        id="player-img"
        src={playerProfile.imageURL}
        alt={playerProfile.name}
      />
      <figcaption id="player-img-caption">
        {playerProfile.name} playing for {playerProfile.citizenship}
      </figcaption>
    </div>
    <section
      id="scroll-reveal"
      className="player-description-container d-flex justify-content-center flex-column align-items-center text-dark"
    >
      <p className="player-description-content ">
        {playerProfile.description}
        {/* {desc.map((word, index) => (
                <>
                  ➤ {word}
                  <br /> <br />
                </>
              ))} */
}
//       </p>

//       <section className="player-info">
//         <p className="mb-5 text-decoration-underline fw-bold">Player Profile</p>
//         <p>Full Name: {playerProfile.name}</p>
//         <p>
//           Date of Birth:
//           {playerProfile.dateOfBirth}
//         </p>
//         <p>Place of Birth: {playerProfile.placeOfBirth}</p>

//         <p>Height:{playerProfile.height}</p>
//         <p>
//           Citizenship:
//           {playerProfile.citizenship}
//         </p>
//         <p>Position: {playerProfile.position}</p>
//         <p>Foot: {playerProfile.foot}</p>
//         <p>Outfitter: {playerProfile.outfitter}</p>
//         <p>Shirt no.: {playerProfile.shirtNumber}</p>

//         {/* <p>
//                 You can get full details using the{" "}
//                 <a
//                   id="tribute-link"
//                   href="https://en.wikipedia.org/wiki/Jos%C3%A9_Antonio_Reyes"
//                   target="_blank"
//                 >
//                   Wikipedia{" "}
//                 </a>{" "}
//                 link.
//               </p> */}
//       </section>
//     </section>
//   </div>
// </section> */}
