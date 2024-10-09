import React, { forwardRef, useImperativeHandle, useRef } from "react";

const GameOver = forwardRef(function ({ winner, onClick }, ref) {
  const dialogRef = useRef();

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => {
          dialogRef.current.showModal();
        },
        close: () => {
          console.log("close");
          dialogRef.current.close();
        },
      };
    }
  );

  return (
    <dialog ref={dialogRef} id="game-over">
      <h2>Game Over</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>Draw!</p>}
      <form method="dialog">
        <button type="submit" onClick={onClick}>
          Rematch!
        </button>
      </form>
    </dialog>
  );
});

export default GameOver;
