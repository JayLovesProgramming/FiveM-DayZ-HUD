import { LiaRunningSolid } from "react-icons/lia";

interface StaminaBarProps {
  stamina: number; // Accept stamina as a prop
}

const StaminaBar: React.FC<StaminaBarProps> = ({ stamina }) => {
  // Calculate the width based on the stamina value (assuming max stamina is 100)
  const maxStamina = 100; // Adjust this value based on your requirements
  const width = `${(stamina / maxStamina) * 100}%`; // Convert stamina to a percentage

  return (
    <>
      {/* Stamina Bar */}
      <div className="flex flex-row items-center mt-5 gap-2">
        <div className="w-64 h-1.5 ring-[1px] ring-opacity-40 ring-white rounded-sm bg-white bg-opacity-40 flex items-center justify-start flex-row-reverse">
          <div
            className="h-1 rounded-sm bg-gray-200 bg-opacity-80"
            style={{ width }} // Apply calculated width
          ></div>
        </div>
        <LiaRunningSolid size={25} />
      </div>
    </>
  );
};

export default StaminaBar;
