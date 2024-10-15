import "./App.css";
import { useState, useEffect } from "react";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardDoubleArrowUp,
  MdOutlineKeyboardDoubleArrowDown,
} from "react-icons/md";

import StaminaBar from "./StaminaBar";
import Compass from "./Compass";
import Speedometer from "./Speedometer";
const playerDirection = 180; 

interface LoadImagesParams {
  folder: string; // Folder name containing images
  count: number; // Number of images to load
}

// Function to load images dynamically
const loadImages = (folder: string, count: number) => {
  return Promise.all(
    Array.from(
      { length: count },
      (_, i) => import(`/${folder}/${folder}${i}.png`)
    )
  );
};

// ArrowButton Component to handle different arrow icons
const ArrowButton = ({
  isTop,
  isBottom,
  isDoubleTop,
  isDoubleBottom,
}: {
  isTop: boolean;
  isBottom: boolean;
  isDoubleTop: boolean;
  isDoubleBottom: boolean;
}) => {
  if (isDoubleTop) {
    return <MdOutlineKeyboardDoubleArrowUp size={25} />;
  }
  if (isTop) {
    return <MdOutlineKeyboardArrowUp size={25} />;
  }
  if (isDoubleBottom) {
    return <MdOutlineKeyboardDoubleArrowDown size={25} />;
  }
  if (isBottom) {
    return <MdOutlineKeyboardArrowDown size={25} />;
  }
};

function App() {
  const [healthIcons, setHealthIcons] = useState<string[]>([]);
  const [drinkIcons, setDrinkIcons] = useState<string[]>([]);
  const [foodIcons, setFoodIcons] = useState<string[]>([]);
  const [armourIcons, setArmourIcons] = useState<string[]>([]);

  const [levels, setLevels] = useState({
    health: 100,
    armour: 100,
    drink: 100,
    food: 100,
    stamina: 100,
  });

  // State to track whether the player is in a vehicle
  const [isInVehicle, setIsInVehicle] = useState(true);

  useEffect(() => {
    const fetchIcons = async () => {
      const [health, drink, food, armour] = await Promise.all([
        loadImages("drink", 20),
        loadImages("armour", 2),
        loadImages("food", 13),
        loadImages("health", 27),
      ]);

      setHealthIcons(health.map((img) => img.default));
      setDrinkIcons(drink.map((img) => img.default));
      setFoodIcons(food.map((img) => img.default));
      setArmourIcons(armour.map((img) => img.default));
    };

    fetchIcons();

    // NUI message listener
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "updateHUD") {
        const { health, armour, drink, food, stamina, inVehicle } = event.data.data;
        setLevels({ health, armour, drink, food, stamina });
        setIsInVehicle(inVehicle); // Update vehicle state
      }
    };

    window.addEventListener("message", handleMessage);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const getIcon = (level: number, icons: string[]) => {
    const index = Math.floor(((100 - level) / 100) * (icons.length - 1));
    return icons[index];
  };

  // Array to manage arrow states for each icon
  const arrowConfigs = [
    { isTop: false, isBottom: false, isDoubleTop: true, isDoubleBottom: false }, // Health
    { isTop: true, isBottom: false, isDoubleTop: false, isDoubleBottom: false }, // Food
    { isTop: false, isBottom: false, isDoubleTop: true, isDoubleBottom: false }, // Drink
    { isTop: false, isBottom: false, isDoubleTop: true, isDoubleBottom: false }, // Armour
  ];

  return (
    <>
      <div>
        <Compass direction={playerDirection} />
        {isInVehicle ? (
          // Show only compass and speedometer when in a vehicle
          <Speedometer />
        ) : (
          // Show the normal HUD (compass + stamina + icons) when on foot
          <div className="w-screen h-screen flex flex-col items-end justify-end p-6">
            <div className="flex flex-row-reverse gap-4 mr-[2.35rem]">
              {[
                { level: levels.health, icons: healthIcons, alt: "Health Icon" },
                { level: levels.food, icons: foodIcons, alt: "Food Icon" },
              ].map((item, index) => (
                <div className="flex items-center justify-end flex-col" key={index}>
                  {!arrowConfigs[index].isDoubleBottom &&
                    !arrowConfigs[index].isBottom && (
                      <ArrowButton {...arrowConfigs[index]} />
                    )}
                  <img
                    height={35}
                    width={35}
                    src={getIcon(item.level, item.icons)}
                    alt={item.alt}
                  />
                  {!arrowConfigs[index].isDoubleTop &&
                    !arrowConfigs[index].isTop && (
                      <ArrowButton {...arrowConfigs[index]} />
                    )}
                </div>
              ))}
              {/** Spacer Div */}
              <h1 className="flex items-center mt-4 text-2xl w-6 opacity-70 justify-center">
                |
              </h1>
              {[
                { level: levels.drink, icons: drinkIcons, alt: "Drink Icon" },
                { level: levels.armour, icons: armourIcons, alt: "Armour Icon" },
              ].map((item, index) => (
                <div
                  className="flex items-center justify-end flex-col"
                  key={index + 2} // Adjusted key for unique identification
                >
                  {!arrowConfigs[index + 2].isDoubleBottom &&
                    !arrowConfigs[index + 2].isBottom && (
                      <ArrowButton {...arrowConfigs[index + 2]} />
                    )}
                  <img
                    height={35}
                    width={35}
                    src={getIcon(item.level, item.icons)}
                    alt={item.alt}
                  />
                  {!arrowConfigs[index + 2].isDoubleTop &&
                    !arrowConfigs[index + 2].isTop && (
                      <ArrowButton {...arrowConfigs[index + 2]} />
                    )}
                </div>
              ))}
            </div>
            <StaminaBar stamina={levels.stamina} />
          </div>
        )}
      </div>
    </>
  );
}

import { createRoot } from "react-dom/client";
createRoot(document.getElementById("root")!).render(<App />);
