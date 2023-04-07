import React from "react";

const Station = ({ station }) => {
  console.log(station);
  if (!station) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{station.Nimi}</h1>
      <p>{station.Osoite}</p>
      <p>Total journeys starting from the station: {station.journeyStart}</p>
      <p>Total journeys ending at the station: {station.journeyEnd}</p>
    </div>
  );
};

export default Station;