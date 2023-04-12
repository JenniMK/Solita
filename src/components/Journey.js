import React from "react";

const Journey = ({ journey }) => {
  if (!journey) {
    return <div>Loading...</div>;
  }

  const distanceKm = (journey["Covered distance (m)"] / 1000).toFixed(2);
  const durationMin = (journey.Duration_sec / 60).toFixed(2);

  return (
    <div>
      <p>
        From: {journey["Departure station name"]} to:{" "}
        {journey["Return station name"]}, distance: {distanceKm} km, time:{" "}
        {durationMin} min
      </p>
    </div>
  );
};

export default Journey;
