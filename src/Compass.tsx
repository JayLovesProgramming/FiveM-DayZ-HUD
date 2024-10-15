import React from "react";
import { TiLocationArrow } from "react-icons/ti";

interface CompassProps {
  direction: number; // Direction in degrees (0 to 360)
}

const Compass: React.FC<CompassProps> = ({ direction }) => {
  // Normalize the direction to ensure it's within the 0-360 range
  const validDirection = Math.max(0, Math.min(360, direction));
  
  // Rotation offset to make 0 degrees point to "N"
  const adjustedDirection = validDirection - 47;

  // Function to determine the color for cardinal points
  const getCardinalColor = (cardinalDirection: number) => {
    const difference = Math.abs(validDirection - cardinalDirection);
    return difference <= 15 ? "text-red-500" : "text-white";
  };

  return (
    <div className="relative">
      <div className="absolute ring-2 ring-opacity-70 ring-red-700 right-0 h-24 w-24 m-3 bg-slate-900 bg-opacity-50 rounded-full flex items-center justify-center">
        <TiLocationArrow
          fill="white"
          size={24}
          className="font-extrabold transition-transform duration-300 ease-in-out"
          style={{ transform: `rotate(${adjustedDirection}deg)` }} // Adjusted rotation based on direction
        />

        <div className="absolute flex items-center justify-center w-full h-full font-bold">
          {/* Cardinal and intercardinal points */}
          <h1 className={`absolute top-0 p-1 text-[1.1rem] font-medium ${getCardinalColor(0)}`}>
            N
          </h1>
          <h1 className={`absolute top-0 right-0 p-4 text-[0.8rem] font-thin ${getCardinalColor(45)}`}>
            NE
          </h1>
          <h1 className={`absolute right-0 p-1 text-[1.1rem] font-medium ${getCardinalColor(90)}`}>
            E
          </h1>
          <h1 className={`absolute right-0 bottom-0 p-4 text-[0.8rem] font-thin ${getCardinalColor(135)}`}>
            SE
          </h1>
          <h1 className={`absolute bottom-0 p-0 text-[1.1rem] font-medium ${getCardinalColor(180)}`}>
            S
          </h1>
          <h1 className={`absolute bottom-0 left-0 p-4 text-[0.8rem] font-thin ${getCardinalColor(225)}`}>
            SW
          </h1>
          <h1 className={`absolute left-0 p-1 text-[1.1rem] font-medium ${getCardinalColor(270)}`}>
            W
          </h1>
          <h1 className={`absolute left-0 top-0 p-4 text-[0.8rem] font-thin ${getCardinalColor(315)}`}>
            NW
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Compass;
