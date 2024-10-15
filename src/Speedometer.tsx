import { useEffect, useState } from 'react';
import './Speedometer.css'; // Import your CSS file for styling

function Speedometer() {
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed((prevSpeed) => (prevSpeed + 1) % 350); // Change speed every 2 seconds
    }, 100);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Adjust the needle rotation for a max speed of 350mph (rotates from -90 to 90 degrees)
  const needleRotation = (speed / 350) * 180 - 90; // Start at -90 degrees

  return (
    <div className="speedometer bottom-0 right-0 mx-5">
      <div className="speedometer-background">
        <div className="needle" style={{ transform: `rotate(${needleRotation}deg)` }} />
      </div>
      <h1 className="speed-display bottom-8 font-extralight text-sm">N</h1>
      <h1 className="speed-display bottom-0">{speed} mph</h1>
    </div>
  );
}

export default Speedometer;
