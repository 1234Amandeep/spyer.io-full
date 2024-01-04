import React, { useContext, useRef, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "../map.css";
import PlayerProfileContext from "../context/PlayerProfileContext";
import L from "leaflet";
import bbox from "geojson-bbox";
import ChangeCenter from "./ChangeCenter";
import favListContext from "../context/favListContext";

export default function Map() {
  const [center, setCenter] = useState([50, 40]);
  const { playerProfile } = useContext(PlayerProfileContext);
  const { favList } = useContext(favListContext);

  console.log(center);
  // if (playerProfile) {
  //   setCenter(playerProfile.latLng);
  // }

  return (
    <div className="map-container container-lg mt-5 mb-5 ">
      <div className="shadows">
        <MapContainer
          className="map "
          center={center}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png"
          />
          {playerProfile && (
            <Marker position={playerProfile.latLng}>
              <Popup>
                <img src={playerProfile.imageURL} alt="" width={"50px"} />
                <p className="text-center">{playerProfile.name}'s home</p>
                <p className="text-center">{playerProfile.placeOfBirth}</p>
              </Popup>
            </Marker>
          )}

          {playerProfile && (
            <ChangeCenter coords={playerProfile.latLng} list={favList} />
          )}
        </MapContainer>
      </div>
    </div>
  );
}
