// import { CiLocationArrow1 } from "react-icons/ci";
import { FaLocationArrow } from "react-icons/fa";

interface CompassProps {
  direction: number; // Direction in degrees (0 to 360)
}

const Compass: React.FC<CompassProps> = ({ direction }) => {
  // Validate direction to ensure it's within the expected range
  const validDirection = Math.max(0, Math.min(360, direction));

  return (
    <div className="absolute ring-2 ring-opacity-40 ring-slate-700 right-0 h-24 w-24 m-3 bg-slate-900 bg-opacity-50 rounded-full flex items-center justify-center">
      <FaLocationArrow
        fill="white"
        fillOpacity={10}
        size={24}
        className="font-extrabold "
        style={{ transform: `rotate(${validDirection}deg)` }}
      />

      <div className="absolute flex items-center justify-center w-full h-full  text-white font-bold">
        <h1 className="absolute top-0 p-1 text-[1.1rem] font-medium">N</h1>
        <h1 className="absolute top-0 right-0 p-4 text-[0.8rem] font-thin">
          NE
        </h1>
        <h1 className="absolute right-0 p-1 text-[1.1rem] font-medium">E</h1>
        <h1 className="absolute right-0 bottom-0 p-4 text-[0.8rem] font-thin">
          SE
        </h1>
        <h1 className="absolute bottom-0 p-0 text-[1.1rem] font-medium">S</h1>
        <h1 className="absolute bottom-0 left-0 p-4 text-[0.8rem] font-thin">
          SW
        </h1>
        <h1 className="absolute left-0 p-1 text-[1.1rem] font-medium">W</h1>
        <h1 className="absolute left-0 top-0 p-4 text-[0.8rem] font-thin">
          NW
        </h1>
      </div>
    </div>
  );
};

export default Compass;
