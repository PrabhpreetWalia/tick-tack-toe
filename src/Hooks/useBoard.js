import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function useBoard() {
  const {boardSize} = useParams()
  const [board, setBoard] = useState(Array(boardSize*boardSize).fill(null));
  const [isXTurns, setXTurns] = useState(true);
  const [msg, setMsg] = useState();
  const [isDisabled, setDisabled] = useState(false)
  const [winIndex, setWinIndex] = useState(Array(3).fill(null))
  const [isDraw, setDraw] = useState(false)

  function createWinningPattern(){

    let winningArray = []
    let temp = []

    for(let i=0; i<(boardSize*boardSize); i++){
      temp.push(i)
      if((i+1) % boardSize === 0){
        winningArray.push(temp)
        temp = []
      }
    }

    for(let i=0; i< boardSize; i++){
      temp = []
      for(let j=0; j< boardSize; j++){
        temp.push(i+(boardSize*j))
      }
      winningArray.push(temp)
    }

    
    temp = [0]
    for(let i=0; i < boardSize-1; i++){
      temp.push(Number(temp[temp.length - 1])+Number(boardSize)+1)
    }

    winningArray.push(temp)

    temp = [Number(boardSize-1)]
    for(let i=0; i < boardSize-1; i++){
      temp.push(Number(temp[temp.length - 1])+Number(boardSize)-1)
    }

    winningArray.push(temp)



    return winningArray

  }

  const winningPattern = createWinningPattern()

  function resetGame(){
    setBoard(Array(boardSize*boardSize).fill(null))
    setXTurns(true)
    setDisabled(false)
    setWinIndex(Array(boardSize).fill(null))
    setDraw(false)
  }

  function checkWin() {
    let flag = false;

    for (let i = 0; i < winningPattern.length; i++) {
        let win = winningPattern[i];
        let val = board[win[0]];

        if (val === null) {
            continue;
        }

        let patternMatch = true;

        for (let j = 1; j < win.length; j++) {
            if (board[win[j]] !== val) {
                patternMatch = false;
                break;
            }
        }

        if (patternMatch) {
            flag = true;
            console.log("Winning pattern found:", win);
            setWinIndex(win);
            setDisabled(true);
            break;
        }
    }

    return flag;
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
      setMsg((isXTurns ? "Player 2" : "Player 1" )+ " Won!");
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

  return {boardSize, board, updateBoard, isXTurns, msg, isDisabled, winIndex, isDraw, resetGame};
}

export { useBoard };
