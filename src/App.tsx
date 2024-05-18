import { useState } from "react";

type Location = "blacksmith" | "village" | "well" | "bottomOfWell";
type Item = "magnet" | "alternatorPiece" | "nothing";
type VillagerAttitude = "neutral" | "friendly";

interface GameState {
  location: Location;
  inventory: Item[];
  waterWheelFixed: boolean;
  villagersAttitude: VillagerAttitude;
}

const initialState: GameState = {
  location: "blacksmith",
  inventory: [],
  waterWheelFixed: false,
  villagersAttitude: "neutral",
};

function App() {
  const [gameState, setGameState] = useState(initialState);
  const [message, setMessage] = useState("");

  const { location, inventory, waterWheelFixed, villagersAttitude } = gameState;

  const displayLocation = () => {
    switch (location) {
      case "blacksmith":
        return "You are at the blacksmith's shop. You can go to the village.";
      case "village":
        return `You are in the village center. You see villagers around. You can go to the blacksmith, the well, or talk to villagers. ${
          waterWheelFixed ? "The villagers are happy and greet you warmly." : ""
        }`;
      case "well":
        return "You are by the well. You can go down the well using the bucket.";
      case "bottomOfWell":
        return "You are at the bottom of the well. It's dark but you find a missing piece of the water wheel alternator here.";
      default:
        return "";
    }
  };

  const go = (newLocation: Location) => {
    setGameState({ ...gameState, location: newLocation });
  };

  const take = (item: Item) => {
    if (location === "bottomOfWell" && item === "alternatorPiece") {
      setGameState({ ...gameState, inventory: [...inventory, item] });
    } else if (location === "blacksmith" && item === "magnet") {
      setGameState({ ...gameState, inventory: [...inventory, item] });
    }
  };

  const talkToVillagers = () => {
    if (location === "village") {
      if (waterWheelFixed) {
        setMessage(
          "The villagers thank you for fixing the water wheel. They are now friendly towards you."
        );
      } else {
        setMessage("The villagers are busy and seem indifferent to you.");
      }
    }
  };

  const useItem = (item: Item, target: string) => {
    if (inventory.includes(item)) {
      if (
        item === "alternatorPiece" &&
        target === "waterWheel" &&
        location === "village"
      ) {
        setGameState({
          ...gameState,
          waterWheelFixed: true,
          villagersAttitude: "friendly",
        });
        setMessage(
          "You use the alternator piece to fix the water wheel. The wheel starts turning, and water flows again."
        );
      }
    }
  };

  return (
    <div>
      <h1>Waterwheel Quest - A Text Adventure</h1>
      <p>{displayLocation()}</p>
      <div>
        {location !== "blacksmith" && (
          <button onClick={() => go("blacksmith")}>Go to Blacksmith</button>
        )}
        {location !== "village" && (
          <button onClick={() => go("village")}>Go to Village</button>
        )}
        {location !== "well" && location !== "bottomOfWell" && (
          <button onClick={() => go("well")}>Go to Well</button>
        )}
        {location === "well" && (
          <button onClick={() => go("bottomOfWell")}>Go Down the Well</button>
        )}
      </div>
      <div>
        {location === "blacksmith" && !inventory.includes("magnet") && (
          <button onClick={() => take("magnet")}>Take Magnet</button>
        )}
        {location === "bottomOfWell" &&
          !inventory.includes("alternatorPiece") && (
            <button onClick={() => take("alternatorPiece")}>
              Take Alternator Piece
            </button>
          )}
      </div>
      <div>
        {location === "village" && (
          <button onClick={talkToVillagers}>Talk to Villagers</button>
        )}
      </div>
      <div>
        {location === "village" &&
          inventory.includes("alternatorPiece") &&
          !waterWheelFixed && (
            <button onClick={() => useItem("alternatorPiece", "waterWheel")}>
              Use Alternator Piece on Water Wheel
            </button>
          )}
      </div>
      <div>
        <p>Inventory: {inventory.join(", ") || "None"}</p>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default App;
