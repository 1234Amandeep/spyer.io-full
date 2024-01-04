import React from "react";
import { useMap } from "react-leaflet";

export default function ChangeCenter({ coords, list }) {
  console.log(list);
  const map = useMap();
  map.setView(coords, 5);
  // map.

  return null;
}
