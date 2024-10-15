import "./App.css";
import { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";


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

function App() {
  const [healthIcons, setHealthIcons] = useState<string[]>([]);
  const [drinkIcons, setDrinkIcons] = useState<string[]>([]);
  const [foodIcons, setFoodIcons] = useState<string[]>([]);
  const [bloodIcons, setBloodIcons] = useState<string[]>([]);

  const [levels, setLevels] = useState({
    // health: 55,
    // drink: 48,
    // food: 51,
    // blood: 62,
    health: 55,
    drink: 22,
    food: 77,
    blood: 2,
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
  }, []);

  const getIcon = (level: number, icons: string[]) => {
    const index = Math.floor(((100 - level) / 100) * (icons.length - 1));
    return icons[index];
  };

  return (
    <div className="w-screen h-screen flex flex-col items-end justify-end p-6 example">
      <div className="flex flex-row-reverse gap-2">
        <div className="flex items-center justify-end flex-col gap-1">
          <h1>44%</h1>
          <img
            height={35}
            width={35}
            src={getIcon(levels.health, healthIcons)}
            alt="Health Icon"
          />
          <MdOutlineKeyboardDoubleArrowDown size={25} />
        </div>
        <div className="flex items-center justify-end flex-col gap-1">
          <h1>76%</h1>
          <img
            height={35}
            width={35}
            src={getIcon(levels.food, foodIcons)}
            alt="Food Icon"
          />
          <MdOutlineKeyboardArrowDown size={25} />
        </div>
        <div className="flex items-center justify-end flex-col gap-1">
          <h1>55%</h1>
          <img
            height={35}
            width={35}
            src={getIcon(levels.drink, drinkIcons)}
            alt="Water Icon"
          />
          <MdOutlineKeyboardArrowDown size={25} />
        </div>
        <div className="flex items-center justify-center flex-col gap-1">
          <MdOutlineKeyboardArrowUp size={25} />
          <img
            height={35}
            width={35}
            src={getIcon(levels.blood, bloodIcons)}
            alt="Blood Icon"
          />
          <h1>22%</h1>
        </div>
      </div>
    </div>
  );
}

import { createRoot } from "react-dom/client";
createRoot(document.getElementById("root")!).render(<App />);
