import { useState } from "react";

interface Location {
  description: string;
  conditions?: { [key: string]: string };
  actions: {
    go?: string[];
    take?: string[];
    talkToVillagers?: boolean;
    use?: { [key: string]: string };
  };
}

interface GameState {
  location: string;
  inventory: string[];
  waterWheelFixed: boolean;
  villagersAttitude?: string;
  [key: string]: any;
}

interface GameProps {
  data: {
    initialState: GameState;
    locations: { [key: string]: Location };
    messages: {
      villagersFriendly: string;
      villagersNeutral: string;
      wheelFixed: string;
    };
  };
}

function Game({ data }: GameProps) {
  const initialState: GameState = data.initialState;
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [message, setMessage] = useState<string>("");

  const { location, inventory, waterWheelFixed } = gameState;
  const currentLocation: Location = data.locations[location];

  const displayLocation = (): string => {
    let description = currentLocation.description;
    if (currentLocation.conditions) {
      for (const condition in currentLocation.conditions) {
        if (gameState[condition]) {
          description += ` ${currentLocation.conditions[condition]}`;
        }
      }
    }
    return description;
  };

  const handleAction = (action: string, target?: string): void => {
    switch (action) {
      case "go":
        if (target) {
          setGameState({ ...gameState, location: target });
        }
        break;
      case "take":
        if (target && !inventory.includes(target)) {
          setGameState({ ...gameState, inventory: [...inventory, target] });
        }
        break;
      case "talkToVillagers":
        if (waterWheelFixed) {
          setMessage(data.messages.villagersFriendly);
        } else {
          setMessage(data.messages.villagersNeutral);
        }
        break;
      case "use":
        if (target && inventory.includes(target)) {
          if (target === "alternatorPiece" && location === "village") {
            setGameState({
              ...gameState,
              waterWheelFixed: true,
              villagersAttitude: "friendly",
            });
            setMessage(data.messages.wheelFixed);
          }
        }
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Waterwheel Quest - A Text Adventure</h1>
      <p>{displayLocation()}</p>
      <div>
        {currentLocation.actions.go &&
          currentLocation.actions.go.map((loc) => (
            <button key={loc} onClick={() => handleAction("go", loc)}>
              Go to {loc.charAt(0).toUpperCase() + loc.slice(1)}
            </button>
          ))}
      </div>
      <div>
        {currentLocation.actions.take &&
          currentLocation.actions.take.map((item) => (
            <button
              key={item}
              onClick={() => handleAction("take", item)}
              disabled={inventory.includes(item)}
            >
              Take {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
      </div>
      <div>
        {currentLocation.actions.talkToVillagers && (
          <button onClick={() => handleAction("talkToVillagers")}>
            Talk to Villagers
          </button>
        )}
      </div>
      <div>
        {currentLocation.actions.use &&
          Object.keys(currentLocation.actions.use).map((item) => (
            <button
              key={item}
              onClick={() => handleAction("use", item)}
              disabled={!inventory.includes(item) || waterWheelFixed}
            >
              Use {item.charAt(0).toUpperCase() + item.slice(1)} on{" "}
              {currentLocation.actions.use?.[item]}
            </button>
          ))}
      </div>
      <div>
        <p>Inventory: {inventory.join(", ") || "None"}</p>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Game;
