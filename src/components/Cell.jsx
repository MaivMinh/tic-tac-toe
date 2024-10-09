import React from "react";

const Cell = ({ children, onClick, row, col, location, props }) => {

  let style = "";
  if  (location != null)  {
    for (const locate of location)  {
      if  (locate.row == row && locate.col == col)  style = "highlight-cell";
    }
  }
  
  return (
    <button className={style}  onClick={() => onClick(row, col)}>{children}</button>
  );
};

export default Cell;
