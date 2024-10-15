import "./App.css";
import { useState, useEffect } from "react";

interface LoadImagesParams {
  folder: string; // Folder name containing images
  count: number; // Number of images to load
}

// Function to load images dynamically
const loadImages = (folder: string, count: number) => {
  return Promise.all(
    Array.from({ length: count }, (_, i) =>
      import(`../public/${folder}/${folder}${i}.png`)
    )
  );
};

function App() {
  const [healthIcons, setHealthIcons] = useState<string[]>([]);
  const [drinkIcons, setDrinkIcons] = useState<string[]>([]);
  const [foodIcons, setFoodIcons] = useState<string[]>([]);
  const [bloodIcons, setBloodIcons] = useState<string[]>([]);
  
  const [levels, setLevels] = useState({
    health: 55,
    drink: 55,
    food: 55,
    blood: 55,
  });

  useEffect(() => {
    const fetchIcons = async () => {
      const [health, drink, food, blood] = await Promise.all([
        loadImages("health", 25),
        loadImages("drink", 20),
        loadImages("food", 13),
        loadImages("blood", 4),
      ]);

      setHealthIcons(health.map(img => img.default));
      setDrinkIcons(drink.map(img => img.default));
      setFoodIcons(food.map(img => img.default));
      setBloodIcons(blood.map(img => img.default));
    };

    fetchIcons();
  }, []);

  const getIcon = (level: number, icons: string[]) => {
    const index = Math.floor(((100 - level) / 100) * (icons.length - 1));
    return icons[index];
  };

  return (
    <div className="w-screen h-screen flex flex-col items-end justify-end p-5 example">
      <div className="flex flex-row-reverse">
        <img height={45} width={45} src={getIcon(levels.health, healthIcons)} alt="Health Icon" />
        <img height={45} width={45} src={getIcon(levels.food, foodIcons)} alt="Food Icon" />
        <img height={45} width={45} src={getIcon(levels.drink, drinkIcons)} alt="Water Icon" />
        <img height={45} width={45} src={getIcon(levels.blood, bloodIcons)} alt="Blood Icon" />
      </div>
    </div>
  );
}

import { createRoot } from "react-dom/client";
createRoot(document.getElementById("root")!).render(<App />);
