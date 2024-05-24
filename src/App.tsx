import { useState } from "react";
import { Game } from "./Game";
import { title } from "./script";
import { mainStyle } from "./mainStyle";

function App() {
  const [nav, setNav] = useState("/");

  return nav === "/game" ? (
    <Game />
  ) : (
    <div style={mainStyle}>
      <h2 style={{ margin: "auto" }}>{title}</h2>
      <div style={{ margin: "auto" }}>A text adventure</div>
      <button onClick={() => setNav("/game")}>Start</button>
    </div>
  );
}

export default App;
