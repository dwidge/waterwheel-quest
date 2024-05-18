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

function App() {
  const initialState: GameState = {
    location: "blacksmith",
    inventory: [],
    waterWheelFixed: false,
    villagersAttitude: "neutral",
  };

  const [gameState, setGameState] = useState(initialState);

  const displayLocation = (location: Location) => {
    switch (location) {
      case "blacksmith":
        return "You are at the blacksmith's shop. You can go to the village.";
      case "village":
        return `You are in the village center. You see villagers around. You can go to the blacksmith, the well, or talk to villagers. ${
          gameState.waterWheelFixed
            ? "The villagers are happy and greet you warmly."
            : ""
        }`;
      case "well":
        return "You are by the well. You can go down the well using the bucket.";
      case "bottomOfWell":
        return "You are at the bottom of the well. It's dark but you find a missing piece of the water wheel alternator here.";
      default:
        return "";
    }
  };

  const go = (location: Location) => {
    setGameState({ ...gameState, location });
  };

  const take = (item: Item) => {
    if (gameState.location === "bottomOfWell" && item === "alternatorPiece") {
      setGameState({ ...gameState, inventory: [...gameState.inventory, item] });
    } else if (gameState.location === "blacksmith" && item === "magnet") {
      setGameState({ ...gameState, inventory: [...gameState.inventory, item] });
    }
  };

  const talkToVillagers = () => {
    if (gameState.location === "village") {
      if (gameState.waterWheelFixed) {
        return "The villagers thank you for fixing the water wheel. They are now friendly towards you.";
      } else {
        return "The villagers are busy and seem indifferent to you.";
      }
    } else {
      return "There are no villagers here to talk to.";
    }
  };

  const useItem = (item: Item, target: string) => {
    if (gameState.inventory.includes(item)) {
      if (
        item === "alternatorPiece" &&
        target === "waterWheel" &&
        gameState.location === "village"
      ) {
        setGameState({
          ...gameState,
          waterWheelFixed: true,
          villagersAttitude: "friendly",
        });
        return "You use the alternator piece to fix the water wheel. The wheel starts turning, and water flows again.";
      } else {
        return "You can't use that item here.";
      }
    } else {
      return "You don't have that item.";
    }
  };

  return (
    <div>
      <h1>Waterwheel Quest - A Text Adventure</h1>
      <p>{displayLocation(gameState.location)}</p>
      <div>
        <button onClick={() => go("blacksmith")}>Go to Blacksmith</button>
        <button onClick={() => go("village")}>Go to Village</button>
        <button onClick={() => go("well")}>Go to Well</button>
        {gameState.location === "well" && (
          <button onClick={() => go("bottomOfWell")}>Go Down the Well</button>
        )}
      </div>
      <div>
        <button onClick={() => take("magnet")}>Take Magnet</button>
        {gameState.location === "bottomOfWell" && (
          <button onClick={() => take("alternatorPiece")}>
            Take Alternator Piece
          </button>
        )}
      </div>
      <div>
        <button onClick={() => alert(talkToVillagers())}>
          Talk to Villagers
        </button>
      </div>
      <div>
        <button onClick={() => alert(useItem("alternatorPiece", "waterWheel"))}>
          Use Alternator Piece on Water Wheel
        </button>
      </div>
      <div>
        <p>Inventory: {gameState.inventory.join(", ") || "None"}</p>
      </div>
    </div>
  );
}

export default App;
