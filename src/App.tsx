import Game from "./Game";
import gameData from "./game.json";

function App() {
  return (
    <div>
      <Game data={gameData} />
    </div>
  );
}

export default App;
