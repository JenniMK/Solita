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
      <b>From:</b>{journey["Departure station name"]} <b>to:</b>{" "}
        {journey["Return station name"]}, <b>distance:</b> {distanceKm} km, <b>time:</b>{" "}
        {durationMin} min
      </p>
    </div>
  );
};

export default Journey;

