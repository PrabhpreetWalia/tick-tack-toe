import { useEffect, useState } from "react";

function useBoard() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurns, setXTurns] = useState(true);
  const [msg, setMsg] = useState();
  const [isDisabled, setDisabled] = useState(false)
  const [winIndex, setWinIndex] = useState(Array(3).fill(null))
  const [isDraw, setDraw] = useState(false)


  const winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkWin() {
    var flag = false;

    for (let i = 0; i < winningPattern.length; i++) {
      let win = winningPattern[i];
      if (
        board[win[0]] !== null &&
        board[win[0]] === board[win[1]] &&
        board[win[1]] === board[win[2]]
      ) {
        console.log(win)
        flag = true;
        setWinIndex(win)
        setDisabled(true)
      }
    }

    return flag;
  }

  function resetGame(){
    setBoard(Array(9).fill(null))
    setXTurns(true)
    setMsg()
    setDisabled(false)
    setWinIndex(Array(3).fill(null))
    setDraw(false)
  }

  const updateBoard = (index, isXTurns) => {
    if (board[index] !== null) {
      return;
    }

    const tempBoard = [...board];
    tempBoard[index] = isXTurns ? "X" : "O";
    setBoard(tempBoard);

    setXTurns((prev) => !prev);
  };

  useEffect(() => {
    changeStatus();
  }, [isXTurns]);

  const changeStatus = () => {
    if (checkWin()) {
      console.log("checking win");
      setMsg(isXTurns ? "Player 2" : "Player 1" + " Won!");
    } else if (!board.includes(null)) {
      setMsg("Game Draw");
      setDisabled(true)
      setDraw(true)
    } else if (isXTurns) {
      setMsg("Player 1 Turn");
    } else {
      setMsg("Player 2 Turn");
    }
  };

  return { board, updateBoard, isXTurns, msg, isDisabled, winIndex, isDraw, resetGame};
}

export { useBoard };
