import React from "react";

const SingleStation = ({ station }) => {
  if (!station) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{station.Nimi}</h1>
      <p>{station.Osoite}</p>
      <p>Total journeys starting from the station: {station.journeysStart}</p>
      <p>Total journeys ending at the station: {station.journeysEnd}</p>
    </div>
  );
};

export default SingleStation;