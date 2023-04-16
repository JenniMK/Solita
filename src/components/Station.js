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
          <p><b>Total journeys starting from the station:</b> {station.journeyStart}</p>
          <p><b>Total journeys ending at the station:</b> {station.journeyEnd}</p>
        </div>
      )}
    </div>
  );
};

export default Station;