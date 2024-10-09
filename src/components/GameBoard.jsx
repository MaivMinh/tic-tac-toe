import React, { Children, useState } from "react";
import Cell from "./Cell";

const GameBoard = ({ matrix, onClick, location, props }) => {
  function handleClick(row, col) {
    onClick(row, col);
  }

  return (
    <ol id="game-board">
      {matrix.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol>
              {row.map((col, colIndex) => {
                return (
                  <li key={colIndex}>
                    <Cell location={location} row={rowIndex} col={colIndex} onClick={handleClick}>
                      {col}
                    </Cell>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
};

export default GameBoard;
