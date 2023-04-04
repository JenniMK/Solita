import React, { useState, useEffect } from "react";
import stationService from "../services/station";

const SingleStation = ({ stationId }) => {
  const [station, setStation] = useState(null);

  useEffect(() => {
    const chooseStation = async () => {
      try {
        const showStation = await stationService.getSingle(stationId);
        setStation(showStation);
      } catch (error) {
        console.error("Error fetching station:", error);
      }
    };

    chooseStation();
  }, [stationId]);

  if (!station) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{station.name}</h1>
      <p>{station.address}</p>
      <p>Total journeys starting from the station: {station.journeysStart}</p>
      <p>Total journeys ending at the station: {station.journeysEnd}</p>
    </div>
  );
};

export default SingleStation;