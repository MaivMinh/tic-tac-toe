import { useRef, useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { combinations } from "./assets/winning-combination.js";
import GameOver from "./components/GameOver.jsx";
import Button from "./components/Button.jsx";

const matrix = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [active, setActive] = useState("X");
  const [firstTurns, setFirstTurns] = useState([]);
  const [secondTurns, setSecondTurns] = useState([]);
  const [firstPlayer, setFirstPlayer] = useState({
    name: "Player 1",
    symbol: "X",
  });
  const [secondPlayer, setSecondPlayer] = useState({
    name: "Player 2",
    symbol: "O",
  });
  const [gameBoard, setGameBoard] = useState(matrix);
  const dialogRef = useRef(null);
  const [ascending, setAscending] = useState(true);


  function resetGame() {
    setGameBoard(() => {
      const newGameBoard = [...matrix.map((inner) => [...inner])];
      setActive("X");
      setFirstTurns([]);
      setSecondTurns([]);
      return newGameBoard;
    });
    winner = null;
    location = null;
  }

  function updatingMatrix(row, col) {
    if (
      gameBoard[row][col] != null ||
      gameBoard[row][col] == "X" ||
      gameBoard[row][col] == "Y"
    )
      return;
    setGameBoard((prev) => {
      const newGameBoard = [...prev.map((inner) => [...inner])];
      newGameBoard[row][col] = active;
      return newGameBoard;
    });

    if (active == "X") {
      setFirstTurns((prev) => [
        ...prev,
        { square: { row: row, col: col }, player: active },
      ]);
    } else
      setSecondTurns((prev) => [
        ...prev,
        { square: { row: row, col: col }, player: active },
      ]);

    setActive((prev) => (prev == "X" ? "O" : "X"));
  }

  let winner = null;
  let location = null;
  
  for (const combination of combinations) {
    let firstSquare = gameBoard[combination[0].row][combination[0].col];
    let secondSquare = gameBoard[combination[1].row][combination[1].col];
    let thirdSquare = gameBoard[combination[2].row][combination[2].col];
    if (
      firstSquare != null &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = firstSquare === "X" ? firstPlayer.name : secondPlayer.name;
      location = combination;
    }
  }

  if (firstTurns.length + secondTurns.length == 9 && winner == null) {
    winner = "Undefined";
  }

  return (
    <main>
      <div id="game-container">
        {/* Player */}
        <ol id="players" className="highlight-player">
          <Player
            className={active == "X" && "active"}
            onSave={setFirstPlayer}
            player={firstPlayer}
          />
          <Player
            className={active == "O" && "active"}
            onSave={setSecondPlayer}
            player={secondPlayer}
          />
        </ol>

        {winner != null && winner != "Undefined" && (
          <GameOver onClick={resetGame} ref={dialogRef} winner={winner} />
        )}
        {winner == "Undefined" && (
          <GameOver onClick={resetGame} ref={dialogRef} />
        )}

        {/* Game board. */}
        <GameBoard onClick={updatingMatrix} matrix={gameBoard} location={location} />
        <Button onClick={setAscending}>
          {ascending ? "Ascending" : "Descending"}
        </Button>
      </div>
      {/* Log */}
      <Log id={"log-first-player"} ascending={ascending} turns={firstTurns} />
      <Log id={"log-second-player"} turns={secondTurns} ascending={ascending} />
    </main>
  );
}

export default App;
