import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

//  this is the main function which displays all squares button
function Square({ value, onSquareClick }) {
  return (
    <div
      className=" w-14 h-14  text-2xl text-center flex items-center justify-center"
      onClick={onSquareClick}
    >
      {value}
    </div>
  );
}

// this is board function which control squares
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  return (
    <>
      <br></br>
      <div className="text-center flex items-center justify-center">
        <div className="">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <div className="border-t-4 border-b-4 border-indigo-500">
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          </div>
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="border-r-4 border-indigo-500 border-l-4">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <div className="border-t-4 border-b-4 border-indigo-500">
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          </div>

          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className=" ">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <div className="border-t-4 border-b-4 border-indigo-500">
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          </div>
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </>
  );
}

// this is our main function which control the game

export default function Game() {
  const location = useLocation();
  const { img, name } = location.state || {};

  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];
  const [gameOver, setGameOver] = useState(false);

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);

    const isGameOver = nextSquares.every((square) => square !== null);
    setGameOver(isGameOver);
  }

  //  this function calculate winner of the game
  const winner = calculateWinner(currentSquares);
  let status;
  let statusSecond;
  if (winner) {
    status = "you won the game";
    statusSecond = " you won the game";
  }
  if (xIsNext) {
    status = 'your turn : "X"';
  } else if (gameOver) {
    status = "Game over";
    statusSecond = "Game over";
  } else {
    statusSecond = 'your turn : "O"';
  }

  // this is restart function
  const handleRestart = () => {
    setHistory([Array(9).fill(null)]);
    setGameOver(!gameOver);
  };


  
  return (
    <>
      <div className="w-5/6 md:w-1/3  h-fit pb-20  shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="user-holder flex items-center justify-around">
          <ul role="list" className="p-6">
            <li className="flex py-4 ">
              <div className="img-box relative">
                <img className="h-10 w-10 rounded-full " src={img} alt="" />
                <div
                  className={
                    xIsNext
                      ? "active absolute h-3 w-3 -left-1 top-1 bg-customGreen rounded-full"
                      : "active absolute h-3 w-3 -left-1 top-1 bg-slate-100 rounded-full"
                  }
                ></div>
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="text-medium font-medium text-left">{name}</p>
                <p
                  className={
                    winner == "X"
                      ? "text-sm  truncate text-green-300"
                      : "text-xs  truncate"
                  }
                >
                  {status}
                </p>
              </div>
            </li>
          </ul>
          <ul role="list" className="p-6">
            <li className="flex py-4 ">
              <div className="img-box relative">
                <img
                  className="h-10 w-10 rounded-full "
                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <div
                  className={
                    xIsNext
                      ? "active absolute h-3 w-3 -left-1 top-1 bg-slate-100 rounded-full"
                      : "active absolute h-3 w-3 -left-1 top-1 bg-customGreen rounded-full"
                  }
                ></div>
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="text-medium font-medium text-left">jhon</p>
                <p
                  className={
                    winner == "O"
                      ? "text-xs truncate text-green-300"
                      : "text-sm  truncate"
                  }
                >
                  {statusSecond}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="game">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        {(!winner && gameOver) || winner ? (
          <div className="game-over border w-1/2 m-auto mt-10 py-5">
            <h1 className="text-2xl text-red-400">Game over</h1>
            <h3 className="text-green-400">
              {" "}
              {winner == "X"
                ? `winner is ${name}`
                : winner == "O"
                ? "jhon"
                : "no one is winner"}
            </h3>
            <button
              onClick={handleRestart}
              className="bg-indigo-500 p-2 mt-2 text-white rounded "
            >
              restart the game
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
