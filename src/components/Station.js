import React from "react";

const Station = ({ station, calcs }) => {
  if (!station) {
    return <div>Loading...</div>;
  }

  const calcData = calcs.find((calc) => calc.ID === station.ID) || {
    journeyStart: 0,
    journeyEnd: 0,
  };

  return (
    <div>
      <h3>{station.Nimi}</h3>
      <p>{station.Osoite}</p>
      <p>Total journeys starting from the station: {calcData.journeyStart}</p>
      <p>Total journeys ending at the station: {calcData.journeyEnd}</p>
    </div>
  );
};

export default Station;