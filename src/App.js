import "./App.css";
import { useBoard, useStatusMessage } from "./Hooks/useBoard";
import { useState } from "react";

function App() {
  const { board, updateBoard, isXTurns, msg, isDisabled, winIndex, isDraw, resetGame } = useBoard();

  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <div className="tick-tock-toe">

      <p className="heading">Tick-Tack-Toe
        <br />
        ( YOUR NORMAL GAME !!! )
      </p>
      <br />
      <div className="status">{msg}</div>

      <div className="board--container">
        {board.map((value, index) => {
          return (
            <div
              disabled = {isDisabled}
              key={index}
              className={`board--box${isDraw?" draw--box":""}${winIndex.includes(index)?" win--box":""}${value ? " box--selected" : ""} `}
              onClick={() => {
                updateBoard(index, isXTurns);
              }}
              onMouseOver={() => {
                setHoverIndex(index);
              }}
              onMouseOut={() => {
                setHoverIndex(null);
              }}
            >
              {value
                ? value
                : hoverIndex === index
                ? isXTurns
                  ? "X"
                  : "O"
                : ""}
            </div>
          );
        })}
      </div>
      <button className="reset--button" onClick={resetGame}>Reset</button>

    </div>
  );
}

export default App;
