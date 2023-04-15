import { useState } from "react";

const Station = ({ station }) => {
  const [visible, setVisible] = useState(false);

  if (!station) {
    return <div>Loading...</div>;
  }

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div className="station">
      <h3 onClick={toggleVisible}>{station.Nimi}</h3>
      {visible && (
        <div>
          <p>{station.Osoite}</p>
          <p>Total journeys starting from the station: {station.journeyStart}</p>
          <p>Total journeys ending at the station: {station.journeyEnd}</p>
        </div>
      )}
    </div>
  );
};

export default Station;