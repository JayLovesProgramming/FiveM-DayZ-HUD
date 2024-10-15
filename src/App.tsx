import "./App.css";
import { useState, useEffect } from "react";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardDoubleArrowUp,
  MdOutlineKeyboardDoubleArrowDown,
} from "react-icons/md";

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
  const [bloodIcons, setBloodIcons] = useState<string[]>([]);
  
  const [levels, setLevels] = useState({
    health: 100,
    armour: 100,
    drink: 100,
    food: 100,
    stamina: 100,
    stress: 0,
  });

  useEffect(() => {
    const fetchIcons = async () => {
      const [health, drink, food, blood] = await Promise.all([
        loadImages("health", 27),
        loadImages("drink", 20),
        loadImages("food", 13),
        loadImages("blood", 27),
      ]);

      setHealthIcons(health.map((img) => img.default));
      setDrinkIcons(drink.map((img) => img.default));
      setFoodIcons(food.map((img) => img.default));
      setBloodIcons(blood.map((img) => img.default));
    };

    fetchIcons();

    // NUI message listener
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "updateHUD") {
        const { health, armour, drink, food, stamina, stress } = event.data.data;
        setLevels({ health, armour, drink, food, stamina, stress });
      }
    };

    window.addEventListener('message', handleMessage);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('message', handleMessage);
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
    { isTop: false, isBottom: false, isDoubleTop: true, isDoubleBottom: false }, // Blood
  ];

  return (
    <div className="w-screen h-screen flex flex-col items-end justify-end p-6 example">
      <div className="flex flex-row-reverse gap-2">
        {[
          { level: levels.health, icons: healthIcons, alt: "Health Icon" },
          { level: levels.food, icons: foodIcons, alt: "Food Icon" },
          { level: levels.drink, icons: drinkIcons, alt: "Drink Icon" },
          { level: levels.armour, icons: bloodIcons, alt: "Blood Icon" },
        ].map((item, index) => (
          <div
            className="flex items-center justify-end flex-col gap-1"
            key={index}
          >
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
            {!arrowConfigs[index].isDoubleTop && !arrowConfigs[index].isTop && (
              <ArrowButton {...arrowConfigs[index]} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

import { createRoot } from "react-dom/client";
createRoot(document.getElementById("root")!).render(<App />);
