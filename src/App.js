import React from 'react';
import GameBoard from './components/GameBoard';
import Square from './components/Square';
import { useState, useEffect } from 'react';
import { Patterns } from './components/Patterns';
import './App.css';

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState({winner: "none" , state: "none"});

  useEffect(()=>{
    checkWin();
    checkTieBreaker();
    if(player == "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }

  }, [board]);

  useEffect(()=>{
    if(result.state !== "none") {
      alert(`End of the game, Winner is ${result.winner}`);
      alert(`Because we have a winner, its better to restart the game`);
      restartGame();
    }
  }, [result]);
  
  const chooseSquare = (square) => {
    setBoard(board.map((val, index)=>{      
      if(index == square && val == "") {
        return player;
      }
        return val;      
    }));

   
  }
const restartGame = () => {
  setBoard(["","","","","","","","",""]);
  setPlayer("O")
}
  const checkWin = () => {
    Patterns.forEach((currentPattern)=>{
      const firstPlayer = board[currentPattern[0]];
      
      if(firstPlayer == "") return ;
      let foundWinningPattern = true;
      currentPattern.forEach((index)=>{
        console.log(index);
        if(board[index] !== firstPlayer) {
          foundWinningPattern = false;
        }
      })
      if (foundWinningPattern) {
        setResult({winner: player , state: "Winner"})
      }      
    })
  }

  const checkTieBreaker = () => {
    let filled = true;    
    board.forEach((square)=>{      
      if(square == "") {
        filled = false;
      }
    })

    if(filled) {
      setResult({winner: "No one. Its a tie", state: "Tie"})
    }
  }
  return (
    <div className="App">
     <div className='board' >
     <div className='row'>
       <Square val={board[0]} chooseSquare={()=>{chooseSquare(0)}} />
       <Square val={board[1]} chooseSquare={()=>{chooseSquare(1)}} />
       <Square val={board[2]} chooseSquare={()=>{chooseSquare(2)}} />
     </div>
     <div className='row'>
        <Square val={board[3]} chooseSquare={()=>{chooseSquare(3)}} />
        <Square val={board[4]} chooseSquare={()=>{chooseSquare(4)}} />
        <Square val={board[5]} chooseSquare={()=>{chooseSquare(5)}} />
     </div>

     <div className='row'>
        <Square val={board[6]} chooseSquare={()=>{chooseSquare(6)}} />
        <Square val={board[7]} chooseSquare={()=>{chooseSquare(7)}} />
        <Square val={board[8]} chooseSquare={()=>{chooseSquare(8)}} />
     </div>
     </div>
      
    </div>
  );
}

export default App;