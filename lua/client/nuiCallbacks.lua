-- Load the config
local config = require("shared/shared")
local jayPrint = print

-- Make statebags?
local hudToggled = config.defaultHUDEnabled
local arrowsToggled = config.defaultArrowsEnabled

-- A override function for FiveM native "print()"
local function jayPrint(...)
    print("DayZ HUD Made By Jay: ", ...)
end

-- A function to retrieve the players stats. This gets sent to the NUI 
local function getStats()
    local player = cache.ped
    local health = GetEntityHealth(player)
    local armour = GetPedArmour(player)
    local drink = 0.0 -- Get players thirst level
    local food = 0.0 -- Get players hunger level
    -- local temp = 0.0 -- Get players temperature level   -- TODO: Temp
    local stamina = 0.0 -- Get players stamina level
    return health, armour, drink, food, stamina
end

local currentTime = GetGameTimer()
local initTime = 0
local thirtySecondsHasPassed = initTime > 30   -- and currentTime

local function handleHudArrows(health, armour, drink, food)
    if thirtySecondsHasPassed then
        health, armour, drink, food, stamina = getStats()
        if health < 50 then -- Less than 50
            healthHasNegativeArrow = true
        else
            healthHasNegativeArrow = false
        end
        if armour < 50 then -- Less than 50
            armourHasNegativeArrow = true
        else
            armourHasNegativeArrow = false
        end
        if drink < 50 then -- Less than 50
            drinkHasNegativeArrow = true
        else
            drinkHasNegativeArrow = false
        end
        if food < 50 then -- Less than 50
            foodHasNegativeArrow = true
        else
            foodHasNegativeArrow = false
        end
        initTime = 0
        return healthHasNegativeArrow, armourHasNegativeArrow, drinkHasNegativeArrow, foodHasNegativeArrow
    end
end

-- This functions handles the arrows on the HUD icons
local function hudArrows()
    local healthHasNegativeArrow = false
    local armourHasNegativeArrow = false
    local drinkHasNegativeArrow = false
    local foodHasNegativeArrow = false
    -- local tempHasArrow = false -- TODO: Temp

    local health, armour, drink, food = getStats()

    while true do
        Wait(0)
        healthHasNegativeArrow, armourHasNegativeArrow, drinkHasNegativeArrow, foodHasNegativeArrow = handleHudArrows(health, armour, drink, food)
        SendNUIMessage({
            type = "updateArrows",
            healthArrow = healthHasNegativeArrow,
            armourArrow = armourHasNegativeArrow,
            drinkArrow = drinkHasNegativeArrow,
            foodArrow = foodHasNegativeArrow,
        })
    end
end
CreateThread(hudArrows)

-- A thread to update the HUD
CreateThread(function()
    while true do
        Wait(1000)
        local health, armour, drink, food, stamina = getStats()
        jayPrint("Updating HUD")
        jayPrint(health, armour, drink, food, stamina)
        SendNUIMessage({
            type = "updateHUD",
            health = health,
            armour = armour,
            drink = drink,
            food = food,
            stamina = stamina,
        })
    end
end)

-- A command to show/hide the arrows on the HUD icons
RegisterCommand("togglearrows", function()
    arrowsToggled = not arrowsToggled
    SendNUIMessage({
        type = "toggleArrows",
        bool = arrowsToggled
    })
end, false)

-- A command to show/hide the HUD
RegisterCommand("togglehud", function()
    hudToggled = not hudToggled
    SendNUIMessage({
        type = "toggleHud",
        bool = hudToggled
    })
end, false)