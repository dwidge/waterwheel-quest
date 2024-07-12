import { useState } from "react";
import { Game } from "./Game";
import { title } from "./script";
import { mainStyle, screenStyle } from "./mainStyle";

function App() {
  const [nav, setNav] = useState("/");

  return nav === "/game" ? (
    <Game />
  ) : (
    <div style={screenStyle}>
      <div style={mainStyle}>
        <h2 style={{ margin: "auto" }}>{title}</h2>
        <div style={{ margin: "auto" }}>A text adventure</div>
        <button onClick={() => setNav("/game")}>Start</button>
      </div>
    </div>
  );
}

export default App;
